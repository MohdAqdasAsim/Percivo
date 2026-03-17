import { AppSettings, Screen } from "@/app/_layout";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  AppState,
  AppStateStatus,
  Easing,
  Linking,
  Modal,
  NativeModules,
  Platform,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type ShortcutMode = "accessibility" | "volume_keys" | "triple_tap";
type MagnificationMode = "full_screen" | "partial_screen" | "switchable";

const SHORTCUT_OPTIONS: {
  id: ShortcutMode;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "accessibility",
    label: "Accessibility Button",
    description: "Tap the floating assistive button to activate magnification.",
    icon: "human",
  },
  {
    id: "volume_keys",
    label: "Volume Keys",
    description: "Hold both volume buttons for 3 seconds to activate.",
    icon: "volume-high",
  },
  {
    id: "triple_tap",
    label: "Triple Tap Screen",
    description: "Tap the screen three times quickly to activate.",
    icon: "gesture-tap",
  },
];

const MAGNIFICATION_OPTIONS: {
  id: MagnificationMode;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "full_screen",
    label: "Magnify Full Screen",
    description: "The entire screen zooms in uniformly.",
    icon: "expand-outline",
  },
  {
    id: "partial_screen",
    label: "Magnify Part of Screen",
    description: "Only a selected area of the screen zooms.",
    icon: "crop-outline",
  },
  {
    id: "switchable",
    label: "Switch Between Both",
    description: "Toggle between full and partial magnification on demand.",
    icon: "swap-horizontal-outline",
  },
];

type PermissionKey = "overlay" | "accessibility" | "battery";

interface PermissionStatus {
  overlay: boolean;
  accessibility: boolean;
  battery: boolean;
}

const PERMISSION_ITEMS: {
  key: PermissionKey;
  icon: "layers-outline" | "human" | "battery-charging-outline";
  label: string;
  description: string;
  openSettings: () => Promise<void>;
}[] = [
  {
    key: "overlay",
    icon: "layers-outline",
    label: "Display over other apps",
    description: "Shows the floating lens on top of any application.",
    openSettings: async () => {
      if (Platform.OS === "android") {
        try {
          await Linking.sendIntent(
            "android.settings.action.MANAGE_OVERLAY_PERMISSION",
          );
        } catch {
          await Linking.openSettings();
        }
      }
    },
  },
  {
    key: "accessibility",
    icon: "human",
    label: "Accessibility access",
    description: "Enables shortcut triggers system-wide.",
    openSettings: async () => {
      if (Platform.OS === "android") {
        try {
          await Linking.sendIntent("android.settings.ACCESSIBILITY_SETTINGS");
        } catch {
          await Linking.openSettings();
        }
      }
    },
  },
  {
    key: "battery",
    icon: "battery-charging-outline",
    label: "Foreground service / Battery",
    description: "Keeps the floating button running in the background.",
    openSettings: async () => {
      if (Platform.OS === "android") {
        try {
          await Linking.sendIntent(
            "android.settings.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS",
          );
        } catch {
          try {
            await Linking.sendIntent(
              "android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS",
            );
          } catch {
            await Linking.openSettings();
          }
        }
      }
    },
  },
];

async function checkPermissions(): Promise<PermissionStatus> {
  if (Platform.OS !== "android") {
    return { overlay: true, accessibility: true, battery: true };
  }

  let overlay = false;
  let accessibility = false;
  let battery = false;

  try {
    const { PermissionChecker } = NativeModules;
    if (PermissionChecker) {
      overlay = await PermissionChecker.canDrawOverlays();
      accessibility = await PermissionChecker.isAccessibilityEnabled();
      battery = await PermissionChecker.isIgnoringBatteryOptimizations();
    } else {
      overlay = await Linking.canOpenURL("package:com.percivo").catch(
        () => false,
      );
      accessibility = false;
      battery = false;
    }
  } catch {
    overlay = await Linking.canOpenURL("package:com.percivo").catch(
      () => false,
    );
    accessibility = false;
    battery = false;
  }

  return { overlay, accessibility, battery };
}

function AccessibilityIllustration({
  accentColor,
  surfaceColor,
  borderColor,
}: {
  accentColor: string;
  surfaceColor: string;
  borderColor: string;
}) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.12,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -4,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 4,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [floatAnim, pulseAnim]);

  return (
    <View className="items-center justify-center my-1" style={{ height: 110 }}>
      <View
        className="rounded-2xl items-center justify-center"
        style={{
          width: 64,
          height: 100,
          backgroundColor: surfaceColor,
          borderWidth: 2,
          borderColor,
          overflow: "visible",
        }}
      >
        <View
          className="absolute top-1.5 rounded-full"
          style={{ width: 16, height: 3, backgroundColor: borderColor }}
        />
        <View
          className="absolute bottom-1.5 rounded-full"
          style={{ width: 14, height: 14, backgroundColor: borderColor }}
        />
        <Animated.View
          className="absolute items-center justify-center rounded-full"
          style={{
            right: -12,
            bottom: 28,
            width: 26,
            height: 26,
            borderRadius: 13,
            backgroundColor: accentColor,
            elevation: 6,
            transform: [{ scale: pulseAnim }, { translateY: floatAnim }],
          }}
        >
          <MaterialCommunityIcons name="human" size={14} color="#fff" />
        </Animated.View>
      </View>
    </View>
  );
}

function VolumeIllustration({
  accentColor,
  surfaceColor,
  borderColor,
}: {
  accentColor: string;
  surfaceColor: string;
  borderColor: string;
}) {
  const pressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(400),
        Animated.timing(pressAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.delay(600),
        Animated.timing(pressAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [pressAnim]);

  return (
    <View className="items-center justify-center my-1" style={{ height: 110 }}>
      <View style={{ position: "relative" }}>
        <View
          className="rounded-2xl items-center justify-center"
          style={{
            width: 64,
            height: 100,
            backgroundColor: surfaceColor,
            borderWidth: 2,
            borderColor,
          }}
        >
          <View
            className="absolute top-1.5 rounded-full"
            style={{ width: 16, height: 3, backgroundColor: borderColor }}
          />
          <View
            className="absolute bottom-1.5 rounded-full"
            style={{ width: 14, height: 14, backgroundColor: borderColor }}
          />
        </View>
        <View style={{ position: "absolute", right: -10, top: 20, gap: 8 }}>
          {[0, 1].map((i) => (
            <Animated.View
              key={i}
              style={{
                width: 5,
                height: 16,
                borderRadius: 3,
                backgroundColor: pressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [borderColor, accentColor],
                }),
                transform: [
                  {
                    scaleX: pressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.3],
                    }),
                  },
                ],
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

function TripleTapIllustration({
  accentColor,
  surfaceColor,
  borderColor,
}: {
  accentColor: string;
  surfaceColor: string;
  borderColor: string;
}) {
  const a1 = useRef(new Animated.Value(0)).current;
  const a2 = useRef(new Animated.Value(0)).current;
  const a3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(a1, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(a1, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.delay(100),
        Animated.timing(a2, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(a2, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.delay(100),
        Animated.timing(a3, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(a3, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.delay(800),
      ]),
    ).start();
  }, [a1, a2, a3]);

  return (
    <View className="items-center justify-center my-1" style={{ height: 110 }}>
      <View
        className="rounded-2xl items-center justify-center overflow-hidden"
        style={{
          width: 64,
          height: 100,
          backgroundColor: surfaceColor,
          borderWidth: 2,
          borderColor,
        }}
      >
        <View
          className="absolute top-1.5 rounded-full"
          style={{ width: 16, height: 3, backgroundColor: borderColor }}
        />
        <View
          className="absolute bottom-1.5 rounded-full"
          style={{ width: 14, height: 14, backgroundColor: borderColor }}
        />
        <View className="items-center justify-center" style={{ gap: 4 }}>
          {[a1, a2, a3].map((anim, i) => (
            <Animated.View
              key={i}
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: accentColor,
                opacity: anim,
                transform: [
                  {
                    scale: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    }),
                  },
                ],
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

function CenteredModal({
  visible,
  onClose,
  children,
  palette,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  palette: (typeof Colors)["light"];
}) {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 18,
          stiffness: 240,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => setRendered(false));
    }
  }, [visible, opacityAnim, scaleAnim]);

  if (!rendered) return null;

  return (
    <Modal
      visible={rendered}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <View className="flex-1 items-center justify-center px-5">
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            className="absolute inset-0"
            style={{
              backgroundColor: "#000",
              opacity: opacityAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.65],
              }),
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          className="w-full rounded-3xl overflow-hidden"
          style={{
            backgroundColor: palette.background,
            borderColor: palette.border,
            borderWidth: 1,
            elevation: 24,
            maxHeight: "85%",
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

function PermissionModal({
  visible,
  onClose,
  onAllGranted,
  palette,
}: {
  visible: boolean;
  onClose: () => void;
  onAllGranted: () => void;
  palette: (typeof Colors)["light"];
}) {
  const [permStatus, setPermStatus] = useState<PermissionStatus>({
    overlay: false,
    accessibility: false,
    battery: false,
  });
  const [checkingOnResume, setCheckingOnResume] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
      checkPermissions().then(setPermStatus);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 18,
          stiffness: 240,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => setRendered(false));
    }
  }, [visible, opacityAnim, scaleAnim]);

  const handleAppStateChange = useCallback(
    async (nextState: AppStateStatus) => {
      if (nextState === "active" && visible) {
        setCheckingOnResume(true);
        const updated = await checkPermissions();
        setPermStatus(updated);
        setCheckingOnResume(false);
      }
    },
    [visible],
  );

  useEffect(() => {
    const sub = AppState.addEventListener("change", handleAppStateChange);
    return () => sub.remove();
  }, [handleAppStateChange]);

  const handleOpen = async (item: (typeof PERMISSION_ITEMS)[0]) => {
    await item.openSettings();
  };

  const allGranted =
    permStatus.overlay && permStatus.accessibility && permStatus.battery;

  if (!rendered) return null;

  return (
    <Modal
      visible={rendered}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <View className="flex-1 items-center justify-center px-5">
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            className="absolute inset-0"
            style={{
              backgroundColor: "#000",
              opacity: opacityAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.65],
              }),
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          className="w-full rounded-3xl"
          style={{
            backgroundColor: palette.background,
            borderColor: palette.border,
            borderWidth: 1,
            elevation: 24,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
            padding: 20,
          }}
        >
          <View
            className="w-12 h-12 rounded-2xl items-center justify-center self-center mb-4"
            style={{ backgroundColor: palette.accent + "18" }}
          >
            <MaterialCommunityIcons
              name="shield-lock-outline"
              size={26}
              color={palette.accent}
            />
          </View>
          <Text
            className="text-lg font-bold text-center mb-1"
            style={{ color: palette.text }}
          >
            Permissions Required
          </Text>
          <Text
            className="text-sm text-center mb-5"
            style={{ color: palette.textSecondary }}
          >
            Grant all three permissions to enable shortcuts. Tap each button to
            open the relevant settings, then return here.
          </Text>

          <View style={{ gap: 10 }}>
            {PERMISSION_ITEMS.map((item) => {
              const granted = permStatus[item.key];
              return (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => handleOpen(item)}
                  activeOpacity={0.8}
                  className="flex-row items-center rounded-2xl px-4 py-3.5"
                  style={{
                    backgroundColor: granted
                      ? palette.accent + "12"
                      : palette.surface,
                    borderWidth: 1.5,
                    borderColor: granted ? palette.accent : palette.border,
                    gap: 12,
                  }}
                >
                  <View
                    className="w-9 h-9 rounded-xl items-center justify-center"
                    style={{
                      backgroundColor: granted
                        ? palette.accent + "20"
                        : palette.surfaceSecondary,
                    }}
                  >
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={20}
                      color={granted ? palette.accent : palette.textSecondary}
                    />
                  </View>
                  <View className="flex-1">
                    <Text
                      className="text-sm font-semibold"
                      style={{ color: palette.text }}
                    >
                      {item.label}
                    </Text>
                    <Text
                      className="text-xs mt-0.5"
                      style={{ color: palette.textSecondary }}
                    >
                      {item.description}
                    </Text>
                  </View>
                  {granted ? (
                    <View
                      className="w-6 h-6 rounded-full items-center justify-center"
                      style={{ backgroundColor: palette.accent }}
                    >
                      <Ionicons
                        name="checkmark"
                        size={14}
                        color={palette.accentForeground}
                      />
                    </View>
                  ) : (
                    <View
                      className="flex-row items-center rounded-lg px-2 py-1"
                      style={{ backgroundColor: palette.accent + "18", gap: 4 }}
                    >
                      <Text
                        className="text-xs font-semibold"
                        style={{ color: palette.accent }}
                      >
                        Open
                      </Text>
                      <Ionicons
                        name="open-outline"
                        size={12}
                        color={palette.accent}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {checkingOnResume && (
            <Text
              className="text-xs text-center mt-3"
              style={{ color: palette.textSecondary }}
            >
              Checking permissions...
            </Text>
          )}

          <View className="flex-row mt-5" style={{ gap: 10 }}>
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 py-3.5 rounded-2xl items-center"
              style={{
                backgroundColor: palette.surface,
                borderWidth: 1,
                borderColor: palette.border,
              }}
            >
              <Text
                className="text-sm font-semibold"
                style={{ color: palette.textSecondary }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={allGranted ? onAllGranted : undefined}
              activeOpacity={allGranted ? 0.85 : 1}
              className="flex-1 py-3.5 rounded-2xl items-center"
              style={{
                backgroundColor: allGranted
                  ? palette.accent
                  : palette.accent + "40",
              }}
            >
              <Text
                className="text-sm font-bold"
                style={{
                  color: allGranted
                    ? palette.accentForeground
                    : palette.accentForeground + "60",
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

function SectionHeader({
  title,
  palette,
}: {
  title: string;
  palette: (typeof Colors)["light"];
}) {
  return (
    <Text
      className="text-xs font-bold tracking-widest uppercase mb-3 px-1"
      style={{ color: palette.textSecondary }}
    >
      {title}
    </Text>
  );
}

function InfoCard({
  title,
  steps,
  icon,
  palette,
}: {
  title: string;
  steps: string[];
  icon: string;
  palette: (typeof Colors)["light"];
}) {
  return (
    <View
      className="rounded-2xl p-4 mb-3"
      style={{
        backgroundColor: palette.surface,
        borderWidth: 1,
        borderColor: palette.border,
      }}
    >
      <View className="flex-row items-center mb-3" style={{ gap: 10 }}>
        <View
          className="w-8 h-8 rounded-xl items-center justify-center"
          style={{ backgroundColor: palette.accent + "18" }}
        >
          <MaterialCommunityIcons
            name={icon as any}
            size={18}
            color={palette.accent}
          />
        </View>
        <Text className="text-sm font-bold" style={{ color: palette.text }}>
          {title}
        </Text>
      </View>
      {steps.map((step, i) => (
        <View key={i} className="flex-row items-start mb-2" style={{ gap: 10 }}>
          <View
            className="w-5 h-5 rounded-full items-center justify-center mt-0.5"
            style={{ backgroundColor: palette.accent + "18" }}
          >
            <Text
              className="text-xs font-bold"
              style={{ color: palette.accent }}
            >
              {i + 1}
            </Text>
          </View>
          <Text
            className="flex-1 text-sm leading-5"
            style={{ color: palette.textSecondary }}
          >
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
}

interface HomeScreenProps {
  navigate: (screen: Screen) => void;
  initialSettings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

export default function HomeScreen({
  navigate,
  initialSettings,
  onSettingsChange,
}: HomeScreenProps) {
  const { colorPalette } = useTheme();
  const palette = Colors[colorPalette];

  const [alwaysOn, setAlwaysOn] = useState(initialSettings.alwaysOn);
  const [shortcutEnabled, setShortcutEnabled] = useState(
    initialSettings.shortcutEnabled,
  );
  const [shortcutModes, setShortcutModes] = useState<ShortcutMode[]>(
    initialSettings.shortcutModes as ShortcutMode[],
  );
  const [magnificationMode, setMagnificationMode] = useState<MagnificationMode>(
    initialSettings.magnificationMode as MagnificationMode,
  );

  const [shortcutModal, setShortcutModal] = useState(false);
  const [magnificationModal, setMagnificationModal] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);
  const [firstTimeModal, setFirstTimeModal] = useState(false);

  const [tempShortcutModes, setTempShortcutModes] = useState<ShortcutMode[]>(
    [],
  );
  const [tempMagnificationMode, setTempMagnificationMode] =
    useState<MagnificationMode>("full_screen");

  const alwaysOnDesc = useRef(
    new Animated.Value(initialSettings.alwaysOn ? 1 : 0),
  ).current;

  useEffect(() => {
    AsyncStorage.getItem("firstTimeSeen").then(async (ft) => {
      if (!ft) {
        setFirstTimeModal(true);
        await AsyncStorage.setItem("firstTimeSeen", "true");
      }
    });
  }, []);

  useEffect(() => {
    Animated.timing(alwaysOnDesc, {
      toValue: alwaysOn ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [alwaysOn, alwaysOnDesc]);

  const saveAndBroadcast = useCallback(
    async (patch: Partial<AppSettings>) => {
      const next: AppSettings = {
        alwaysOn,
        shortcutEnabled,
        shortcutModes,
        magnificationMode,
        ...patch,
      };
      onSettingsChange(next);
      const writes = Object.entries(patch).map(([k, v]) =>
        AsyncStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v)),
      );
      await Promise.all(writes);
    },
    [
      alwaysOn,
      shortcutEnabled,
      shortcutModes,
      magnificationMode,
      onSettingsChange,
    ],
  );

  const handleAlwaysOn = (v: boolean) => {
    setAlwaysOn(v);
    saveAndBroadcast({ alwaysOn: v });
  };

  const handleShortcutToggle = async (v: boolean) => {
    if (!v) {
      setShortcutEnabled(false);
      saveAndBroadcast({ shortcutEnabled: false });
      return;
    }
    const status = await checkPermissions();
    const allOk = status.overlay && status.accessibility && status.battery;
    if (allOk) {
      setShortcutEnabled(true);
      saveAndBroadcast({ shortcutEnabled: true });
    } else {
      setPermissionModal(true);
    }
  };

  const handlePermissionsAllGranted = () => {
    setPermissionModal(false);
    setShortcutEnabled(true);
    saveAndBroadcast({ shortcutEnabled: true });
  };

  const handlePermissionModalClose = () => {
    setPermissionModal(false);
    setShortcutEnabled(false);
    saveAndBroadcast({ shortcutEnabled: false });
  };

  const openShortcutModal = () => {
    setTempShortcutModes([...shortcutModes]);
    setShortcutModal(true);
  };
  const openMagnificationModal = () => {
    setTempMagnificationMode(magnificationMode);
    setMagnificationModal(true);
  };

  const confirmShortcut = () => {
    setShortcutModes(tempShortcutModes);
    saveAndBroadcast({ shortcutModes: tempShortcutModes });
    setShortcutModal(false);
  };

  const confirmMagnification = () => {
    setMagnificationMode(tempMagnificationMode);
    saveAndBroadcast({ magnificationMode: tempMagnificationMode });
    setMagnificationModal(false);
  };

  const toggleTempMode = (id: ShortcutMode) => {
    setTempShortcutModes((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const resetSettings = async () => {
    setAlwaysOn(false);
    setShortcutEnabled(false);
    setShortcutModes([]);
    setMagnificationMode("full_screen");
    alwaysOnDesc.setValue(0);
    const patch: AppSettings = {
      alwaysOn: false,
      shortcutEnabled: false,
      shortcutModes: [],
      magnificationMode: "full_screen",
    };
    onSettingsChange(patch);
    await AsyncStorage.multiRemove([
      "alwaysOn",
      "shortcutEnabled",
      "shortcutModes",
      "magnificationMode",
    ]);
  };

  const magLabel =
    MAGNIFICATION_OPTIONS.find((o) => o.id === magnificationMode)?.label ?? "";
  const shortcutLabel =
    shortcutModes.length === 0
      ? "None selected"
      : shortcutModes.length === SHORTCUT_OPTIONS.length
        ? "All methods"
        : shortcutModes.length === 1
          ? (SHORTCUT_OPTIONS.find((o) => o.id === shortcutModes[0])?.label ??
            "")
          : `${shortcutModes.length} methods`;

  return (
    <View className="flex-1" style={{ backgroundColor: palette.background }}>
      <View
        className="flex-row items-center justify-between px-5 pt-14 pb-4"
        style={{ backgroundColor: palette.background }}
      >
        <View>
          <Text
            className="text-2xl font-extrabold tracking-tight"
            style={{ color: palette.text }}
          >
            Percivo
          </Text>
          <Text
            className="text-xs mt-0.5"
            style={{ color: palette.textSecondary }}
          >
            Magnification Settings
          </Text>
        </View>
        <View className="flex-row items-center" style={{ gap: 8 }}>
          <TouchableOpacity
            onPress={() => navigate("about")}
            className="w-9 h-9 rounded-full items-center justify-center"
            style={{
              backgroundColor: palette.surface,
              borderWidth: 1,
              borderColor: palette.border,
            }}
          >
            <Feather name="info" size={18} color={palette.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("help")}
            className="w-9 h-9 rounded-full items-center justify-center"
            style={{
              backgroundColor: palette.surface,
              borderWidth: 1,
              borderColor: palette.border,
            }}
          >
            <Feather name="help-circle" size={18} color={palette.accent} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="Configuration" palette={palette} />
        <View
          className="rounded-2xl mb-6 overflow-hidden"
          style={{
            backgroundColor: palette.surface,
            borderWidth: 1,
            borderColor: palette.border,
          }}
        >
          <View
            className="flex-row items-center px-4 py-3.5"
            style={{ borderBottomWidth: 1, borderBottomColor: palette.border }}
          >
            <View
              className="w-9 h-9 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "#F59E0B18" }}
            >
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={20}
                color="#F59E0B"
              />
            </View>
            <TouchableOpacity
              className="flex-1"
              onPress={openShortcutModal}
              activeOpacity={0.7}
            >
              <Text
                className="text-sm font-semibold"
                style={{ color: palette.text }}
              >
                Shortcut
              </Text>
              <Text
                className="text-xs mt-0.5"
                style={{ color: palette.textSecondary }}
              >
                {shortcutEnabled ? shortcutLabel : "Tap to configure"}
              </Text>
            </TouchableOpacity>
            <Switch
              value={shortcutEnabled}
              onValueChange={handleShortcutToggle}
              trackColor={{
                false: palette.border,
                true: palette.accent + "80",
              }}
              thumbColor={
                shortcutEnabled ? palette.accent : palette.surfaceSecondary
              }
            />
          </View>

          <TouchableOpacity
            onPress={openMagnificationModal}
            activeOpacity={0.7}
            className="flex-row items-center px-4 py-3.5"
            style={{ borderBottomWidth: 1, borderBottomColor: palette.border }}
          >
            <View
              className="w-9 h-9 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: palette.accent + "18" }}
            >
              <MaterialCommunityIcons
                name="magnify"
                size={20}
                color={palette.accent}
              />
            </View>
            <View className="flex-1">
              <Text
                className="text-sm font-semibold"
                style={{ color: palette.text }}
              >
                Magnification
              </Text>
              <Text
                className="text-xs mt-0.5"
                style={{ color: palette.textSecondary }}
              >
                {magLabel}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={palette.textSecondary}
            />
          </TouchableOpacity>

          <View>
            <View className="flex-row items-center px-4 py-3.5">
              <View
                className="w-9 h-9 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: "#10B98118" }}
              >
                <MaterialCommunityIcons name="pin" size={20} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-sm font-semibold"
                  style={{ color: palette.text }}
                >
                  Always-On
                </Text>
                <Text
                  className="text-xs mt-0.5"
                  style={{ color: palette.textSecondary }}
                >
                  Stay active across app switches
                </Text>
              </View>
              <Switch
                value={alwaysOn}
                onValueChange={handleAlwaysOn}
                trackColor={{ false: palette.border, true: "#10B98180" }}
                thumbColor={alwaysOn ? "#10B981" : palette.surfaceSecondary}
              />
            </View>
            <Animated.View
              style={{
                maxHeight: alwaysOnDesc.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 60],
                }),
                opacity: alwaysOnDesc,
                overflow: "hidden",
              }}
            >
              <View
                className="mx-4 mb-3 px-3 py-2.5 rounded-xl flex-row items-start"
                style={{ backgroundColor: "#10B98118", gap: 8 }}
              >
                <MaterialCommunityIcons
                  name="information-outline"
                  size={15}
                  color="#10B981"
                  style={{ marginTop: 1 }}
                />
                <Text
                  className="flex-1 text-xs leading-4"
                  style={{ color: "#10B981" }}
                >
                  Magnification zooms out when switching apps, but stays ready
                  to zoom back in instantly.
                </Text>
              </View>
            </Animated.View>
          </View>
        </View>

        <SectionHeader title="Accessibility Note" palette={palette} />
        <View
          className="rounded-2xl p-4 mb-6 flex-row items-start"
          style={{
            backgroundColor: palette.accent + "10",
            borderWidth: 1,
            borderColor: palette.accent + "30",
            gap: 12,
          }}
        >
          <MaterialCommunityIcons
            name="shield-check-outline"
            size={20}
            color={palette.accent}
            style={{ marginTop: 1 }}
          />
          <Text
            className="flex-1 text-sm leading-5"
            style={{ color: palette.textSecondary }}
          >
            Once accessibility features are enabled, this app will automatically
            launch magnification — regardless of Auto-Launch Management
            settings.
          </Text>
        </View>

        <SectionHeader title="How to Use" palette={palette} />
        <InfoCard
          title="Standard Zoom"
          icon="magnify-plus-outline"
          palette={palette}
          steps={[
            "Use the preset shortcut to start magnification.",
            "Tap the screen.",
            "Drag with two fingers to move around the screen.",
            "Pinch in or out with two fingers to adjust zoom.",
            "Use the shortcut again to stop magnification.",
          ]}
        />
        <InfoCard
          title="Temporary Magnification"
          icon="gesture-tap-hold"
          palette={palette}
          steps={[
            "Use the preset shortcut to start magnification.",
            "Touch and hold anywhere on the screen.",
            "Drag your fingers to move around.",
            "Lift your fingers to stop magnification.",
          ]}
        />

        <TouchableOpacity
          onPress={resetSettings}
          className="flex-row items-center justify-center py-3.5 rounded-2xl mt-2"
          style={{
            backgroundColor: palette.surface,
            borderWidth: 1,
            borderColor: palette.border,
            gap: 8,
          }}
          activeOpacity={0.75}
        >
          <MaterialCommunityIcons
            name="refresh"
            size={17}
            color={palette.textSecondary}
          />
          <Text
            className="text-sm font-medium"
            style={{ color: palette.textSecondary }}
          >
            Reset to Default
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <CenteredModal
        visible={shortcutModal}
        onClose={() => setShortcutModal(false)}
        palette={palette}
      >
        <ScrollView
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            className="text-lg font-bold mb-1"
            style={{ color: palette.text }}
          >
            Choose Shortcuts
          </Text>
          <Text
            className="text-sm mb-5"
            style={{ color: palette.textSecondary }}
          >
            Select one or more activation methods.
          </Text>
          {SHORTCUT_OPTIONS.map((opt) => {
            const selected = tempShortcutModes.includes(opt.id);
            return (
              <TouchableOpacity
                key={opt.id}
                onPress={() => toggleTempMode(opt.id)}
                activeOpacity={0.8}
                className="rounded-2xl mb-3 overflow-hidden"
                style={{
                  backgroundColor: selected
                    ? palette.accent + "12"
                    : palette.surface,
                  borderWidth: 1.5,
                  borderColor: selected ? palette.accent : palette.border,
                }}
              >
                <View
                  className="flex-row items-center px-4 pt-3.5 pb-1"
                  style={{ gap: 12 }}
                >
                  <View
                    className="w-9 h-9 rounded-xl items-center justify-center"
                    style={{
                      backgroundColor: selected
                        ? palette.accent + "20"
                        : palette.surfaceSecondary,
                    }}
                  >
                    <MaterialCommunityIcons
                      name={opt.icon as any}
                      size={20}
                      color={selected ? palette.accent : palette.textSecondary}
                    />
                  </View>
                  <View className="flex-1">
                    <Text
                      className="text-sm font-semibold"
                      style={{ color: palette.text }}
                    >
                      {opt.label}
                    </Text>
                    <Text
                      className="text-xs mt-0.5"
                      style={{ color: palette.textSecondary }}
                    >
                      {opt.description}
                    </Text>
                  </View>
                  <View
                    className="w-5 h-5 rounded-full items-center justify-center"
                    style={{
                      backgroundColor: selected
                        ? palette.accent
                        : "transparent",
                      borderWidth: 1.5,
                      borderColor: selected ? palette.accent : palette.border,
                    }}
                  >
                    {selected && (
                      <Ionicons
                        name="checkmark"
                        size={12}
                        color={palette.accentForeground}
                      />
                    )}
                  </View>
                </View>
                {opt.id === "accessibility" && (
                  <AccessibilityIllustration
                    accentColor={palette.accent}
                    surfaceColor={palette.surfaceSecondary}
                    borderColor={palette.border}
                  />
                )}
                {opt.id === "volume_keys" && (
                  <VolumeIllustration
                    accentColor={palette.accent}
                    surfaceColor={palette.surfaceSecondary}
                    borderColor={palette.border}
                  />
                )}
                {opt.id === "triple_tap" && (
                  <TripleTapIllustration
                    accentColor={palette.accent}
                    surfaceColor={palette.surfaceSecondary}
                    borderColor={palette.border}
                  />
                )}
              </TouchableOpacity>
            );
          })}
          <View className="flex-row mt-2" style={{ gap: 10 }}>
            <TouchableOpacity
              onPress={() => setShortcutModal(false)}
              className="flex-1 py-3.5 rounded-2xl items-center"
              style={{
                backgroundColor: palette.surface,
                borderWidth: 1,
                borderColor: palette.border,
              }}
            >
              <Text
                className="text-sm font-semibold"
                style={{ color: palette.textSecondary }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmShortcut}
              className="flex-1 py-3.5 rounded-2xl items-center"
              style={{ backgroundColor: palette.accent }}
            >
              <Text
                className="text-sm font-bold"
                style={{ color: palette.accentForeground }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </CenteredModal>

      <CenteredModal
        visible={magnificationModal}
        onClose={() => setMagnificationModal(false)}
        palette={palette}
      >
        <View style={{ padding: 20 }}>
          <Text
            className="text-lg font-bold mb-1"
            style={{ color: palette.text }}
          >
            Magnification Mode
          </Text>
          <Text
            className="text-sm mb-5"
            style={{ color: palette.textSecondary }}
          >
            Select how magnification works on your screen.
          </Text>
          {MAGNIFICATION_OPTIONS.map((opt) => {
            const selected = tempMagnificationMode === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                onPress={() => setTempMagnificationMode(opt.id)}
                activeOpacity={0.8}
                className="flex-row items-center rounded-2xl mb-3 px-4 py-3.5"
                style={{
                  backgroundColor: selected
                    ? palette.accent + "12"
                    : palette.surface,
                  borderWidth: 1.5,
                  borderColor: selected ? palette.accent : palette.border,
                  gap: 12,
                }}
              >
                <View
                  className="w-9 h-9 rounded-xl items-center justify-center"
                  style={{
                    backgroundColor: selected
                      ? palette.accent + "20"
                      : palette.surfaceSecondary,
                  }}
                >
                  <Ionicons
                    name={opt.icon as any}
                    size={20}
                    color={selected ? palette.accent : palette.textSecondary}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-sm font-semibold"
                    style={{ color: palette.text }}
                  >
                    {opt.label}
                  </Text>
                  <Text
                    className="text-xs mt-0.5"
                    style={{ color: palette.textSecondary }}
                  >
                    {opt.description}
                  </Text>
                </View>
                <View
                  className="w-5 h-5 rounded-full items-center justify-center"
                  style={{
                    backgroundColor: selected ? palette.accent : "transparent",
                    borderWidth: 1.5,
                    borderColor: selected ? palette.accent : palette.border,
                  }}
                >
                  {selected && (
                    <Ionicons
                      name="checkmark"
                      size={12}
                      color={palette.accentForeground}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
          <View className="flex-row mt-2" style={{ gap: 10 }}>
            <TouchableOpacity
              onPress={() => setMagnificationModal(false)}
              className="flex-1 py-3.5 rounded-2xl items-center"
              style={{
                backgroundColor: palette.surface,
                borderWidth: 1,
                borderColor: palette.border,
              }}
            >
              <Text
                className="text-sm font-semibold"
                style={{ color: palette.textSecondary }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmMagnification}
              className="flex-1 py-3.5 rounded-2xl items-center"
              style={{ backgroundColor: palette.accent }}
            >
              <Text
                className="text-sm font-bold"
                style={{ color: palette.accentForeground }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CenteredModal>

      <PermissionModal
        visible={permissionModal}
        onClose={handlePermissionModalClose}
        onAllGranted={handlePermissionsAllGranted}
        palette={palette}
      />

      <Modal
        visible={firstTimeModal}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={() => setFirstTimeModal(false)}>
          <View
            className="flex-1 justify-center items-center px-6"
            style={{ backgroundColor: "#00000072" }}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                className="rounded-3xl p-6 w-full"
                style={{
                  backgroundColor: palette.background,
                  elevation: 24,
                  borderWidth: 1,
                  borderColor: palette.border,
                }}
              >
                <View
                  className="w-14 h-14 rounded-2xl items-center justify-center self-center mb-4"
                  style={{ backgroundColor: palette.accent + "18" }}
                >
                  <MaterialCommunityIcons
                    name="magnify"
                    size={30}
                    color={palette.accent}
                  />
                </View>
                <Text
                  className="text-xl font-extrabold text-center mb-2"
                  style={{ color: palette.text }}
                >
                  Welcome to Percivo
                </Text>
                <Text
                  className="text-sm text-center leading-5 mb-6"
                  style={{ color: palette.textSecondary }}
                >
                  Configure your shortcuts, pick a magnification mode, and
                  enable Always-On to get started.
                </Text>
                <TouchableOpacity
                  onPress={() => setFirstTimeModal(false)}
                  className="py-3.5 rounded-2xl items-center"
                  style={{ backgroundColor: palette.accent }}
                >
                  <Text
                    className="text-sm font-bold"
                    style={{ color: palette.accentForeground }}
                  >
                    Let&apos;s Go
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
