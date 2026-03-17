import { Colors } from "@/constants/Colors";
import { LINKS } from "@/constants/Details";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  AppState,
  AppStateStatus,
  Dimensions,
  Easing,
  Linking,
  NativeModules,
  PanResponder,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const LAST_SLIDE_INDEX = 3;

const slides = [
  {
    id: 1,
    icon: "magnify",
    label: "MAGNIFY",
    title: "Read\nAnything",
    description:
      "Percivo places a live magnification lens over any part of your screen — without ever leaving your current app.",
  },
  {
    id: 2,
    icon: "gesture-tap-hold",
    label: "CONTROL",
    title: "Floating\nLens",
    description:
      "Drag the lens anywhere on your screen. Pinch to zoom. Works on top of every application, system-wide.",
  },
  {
    id: 3,
    icon: "lightning-bolt",
    label: "ACTIVATE",
    title: "Instant\nAccess",
    description:
      "Triple-tap, hold volume buttons, or use the floating button — you choose how to summon the lens.",
  },
  {
    id: 4,
    icon: "shield-check-outline",
    label: "PERMISSIONS",
    title: "Grant\nAccess",
    description:
      "Percivo needs a few permissions to overlay the lens and respond to your shortcuts.",
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
    description: "Enables shortcuts like triple-tap and volume key activation.",
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

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const { colorPalette } = useTheme();
  const palette = Colors[colorPalette];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);

  const [permStatus, setPermStatus] = useState<PermissionStatus>({
    overlay: false,
    accessibility: false,
    battery: false,
  });
  const [checkingPerms, setCheckingPerms] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isAnimating = useRef(false);

  const isLast = currentIndex === LAST_SLIDE_INDEX;

  useEffect(() => {
    if (isLast) {
      checkPermissions().then(setPermStatus);
    }
  }, [isLast]);

  const handleAppStateChange = useCallback(
    async (nextState: AppStateStatus) => {
      if (
        nextState === "active" &&
        currentIndexRef.current === LAST_SLIDE_INDEX
      ) {
        setCheckingPerms(true);
        const updated = await checkPermissions();
        setPermStatus(updated);
        setCheckingPerms(false);
      }
    },
    [],
  );

  useEffect(() => {
    const sub = AppState.addEventListener("change", handleAppStateChange);
    return () => sub.remove();
  }, [handleAppStateChange]);

  const animateTransition = (
    nextIndex: number,
    direction: "left" | "right",
  ) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const outX = direction === "left" ? -40 : 40;
    const inX = direction === "left" ? 40 : -40;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: outX,
        duration: 160,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start(() => {
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
      slideAnim.setValue(inX);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        isAnimating.current = false;
      });
    });
  };

  const goToIndex = (index: number) => {
    if (index === currentIndexRef.current) return;
    const dir = index > currentIndexRef.current ? "left" : "right";
    animateTransition(index, dir);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 12 && Math.abs(g.dy) < 40,
      onPanResponderRelease: (_, g) => {
        if (isAnimating.current) return;
        const idx = currentIndexRef.current;
        if (g.dx < -50 && idx < slides.length - 1) {
          const nextIdx = idx + 1;
          isAnimating.current = true;
          const outX = -40;
          const inX = 40;
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 160,
              useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
              toValue: outX,
              duration: 160,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 0.95,
              duration: 160,
              useNativeDriver: true,
            }),
          ]).start(() => {
            currentIndexRef.current = nextIdx;
            setCurrentIndex(nextIdx);
            slideAnim.setValue(inX);
            Animated.parallel([
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(slideAnim, {
                toValue: 0,
                duration: 200,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
              }),
              Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
            ]).start(() => {
              isAnimating.current = false;
            });
          });
        } else if (g.dx > 50 && idx > 0) {
          const nextIdx = idx - 1;
          isAnimating.current = true;
          const outX = 40;
          const inX = -40;
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 160,
              useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
              toValue: outX,
              duration: 160,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 0.95,
              duration: 160,
              useNativeDriver: true,
            }),
          ]).start(() => {
            currentIndexRef.current = nextIdx;
            setCurrentIndex(nextIdx);
            slideAnim.setValue(inX);
            Animated.parallel([
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(slideAnim, {
                toValue: 0,
                duration: 200,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
              }),
              Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
            ]).start(() => {
              isAnimating.current = false;
            });
          });
        }
      },
    }),
  ).current;

  const handleNext = () => {
    if (currentIndexRef.current < slides.length - 1) {
      goToIndex(currentIndexRef.current + 1);
    }
  };

  const handleSkip = () => {
    goToIndex(LAST_SLIDE_INDEX);
  };

  const handleComplete = async () => {
    await AsyncStorage.setItem("onboardingComplete", "true");
    onComplete();
  };

  const slide = slides[currentIndex];
  const allGranted =
    permStatus.overlay && permStatus.accessibility && permStatus.battery;

  return (
    <View
      className="flex-1 px-7 pt-14 pb-12 overflow-hidden"
      style={{ backgroundColor: palette.background }}
      {...panResponder.panHandlers}
    >
      <View className="flex-row items-center justify-between mb-2 z-10">
        <View className="px-3 py-1 rounded-full">
          <Text
            className="text-xs font-bold tracking-widest"
            style={{ color: palette.accent }}
          >
            {slide.label}
          </Text>
        </View>
        {!isLast && (
          <TouchableOpacity
            onPress={handleSkip}
            className="flex-row items-center"
            style={{ gap: 2 }}
          >
            <Text
              className="text-sm font-medium"
              style={{ color: palette.textSecondary }}
            >
              Skip
            </Text>
            <Ionicons
              name="chevron-forward"
              size={14}
              color={palette.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      <Animated.View
        className="flex-1 justify-center items-center z-10"
        style={{
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }, { scale: scaleAnim }],
          gap: 28,
        }}
      >
        <View className="w-40 h-40 justify-center items-center">
          <View
            className="absolute w-40 h-40 rounded-full border"
            style={{ borderColor: palette.accent + "30" }}
          />
          <View
            className="absolute w-32 h-32 rounded-full border"
            style={{ borderColor: palette.accent + "60" }}
          />
          <View
            className="w-24 h-24 rounded-full justify-center items-center"
            style={{ backgroundColor: palette.surface, elevation: 8 }}
          >
            <MaterialCommunityIcons
              name={slide.icon as any}
              size={52}
              color={palette.accent}
            />
          </View>
        </View>

        <View className="items-center px-2" style={{ gap: 12 }}>
          <Text
            className="text-5xl font-extrabold text-center"
            style={{ color: palette.text, letterSpacing: -1.5, lineHeight: 52 }}
          >
            {slide.title}
          </Text>
          <View
            className="w-10 h-0.5 rounded-full"
            style={{ backgroundColor: palette.accent }}
          />
          <Text
            className="text-base text-center"
            style={{
              color: palette.textSecondary,
              lineHeight: 26,
              maxWidth: width * 0.78,
            }}
          >
            {slide.description}
          </Text>
        </View>

        {isLast && (
          <View className="w-full" style={{ gap: 10 }}>
            {PERMISSION_ITEMS.map((item) => {
              const granted = permStatus[item.key];
              return (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => item.openSettings()}
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
            {checkingPerms && (
              <Text
                className="text-xs text-center mt-1"
                style={{ color: palette.textSecondary }}
              >
                Checking permissions...
              </Text>
            )}
          </View>
        )}
      </Animated.View>

      <View className="items-center z-10" style={{ gap: 16 }}>
        <View className="flex-row items-center" style={{ gap: 6 }}>
          {slides.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => goToIndex(i)}
              hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
            >
              <View
                className="h-2 rounded-full"
                style={{
                  width: i === currentIndex ? 28 : 8,
                  backgroundColor:
                    i === currentIndex ? palette.accent : palette.border,
                  opacity: i === currentIndex ? 1 : 0.5,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>

        {isLast && (
          <Text
            className="text-xs text-center leading-5 px-2"
            style={{ color: palette.textSecondary }}
          >
            {"By continuing, you agree to our "}
            <Text
              className="font-semibold"
              style={{ color: "#3B82F6" }}
              onPress={() =>
                Linking.openURL(LINKS.privacyPolicy).catch(() => {})
              }
            >
              Privacy Policy
            </Text>
            {" and "}
            <Text
              className="font-semibold"
              style={{ color: "#3B82F6" }}
              onPress={() =>
                Linking.openURL(LINKS.termsOfService).catch(() => {})
              }
            >
              Terms of Service
            </Text>
            {"."}
          </Text>
        )}

        <TouchableOpacity
          onPress={
            isLast ? (allGranted ? handleComplete : undefined) : handleNext
          }
          activeOpacity={isLast ? (allGranted ? 0.85 : 1) : 0.85}
          className="w-full py-4 rounded-2xl items-center flex-row justify-center"
          style={{
            backgroundColor: isLast
              ? allGranted
                ? palette.accent
                : palette.accent + "40"
              : palette.accent,
            gap: 8,
            elevation: isLast && !allGranted ? 0 : 6,
          }}
        >
          <Text
            className="text-base font-bold tracking-wide"
            style={{
              color:
                isLast && !allGranted
                  ? palette.accentForeground + "60"
                  : palette.accentForeground,
            }}
          >
            {isLast ? "All Set — Open Percivo" : "Continue"}
          </Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color={
              isLast && !allGranted
                ? palette.accentForeground + "60"
                : palette.accentForeground
            }
          />
        </TouchableOpacity>

        <Text
          className="text-xs font-medium tracking-widest opacity-60"
          style={{ color: palette.textSecondary }}
        >
          {currentIndex + 1} / {slides.length}
        </Text>
      </View>
    </View>
  );
}
