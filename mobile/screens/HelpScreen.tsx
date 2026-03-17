import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface HelpScreenProps {
  onBack: () => void;
}

const FAQ_ITEMS = [
  {
    question: "Why isn't the lens appearing on top of other apps?",
    answer:
      'The "Display over other apps" (overlay) permission must be granted. Go to Settings → Apps → Percivo → Display over other apps, and enable it.',
  },
  {
    question: "The volume shortcut isn't working. What should I do?",
    answer:
      "Make sure the Accessibility Service is enabled for Percivo in Settings → Accessibility → Percivo. Also ensure you're pressing both volume buttons simultaneously and holding for at least 3 seconds.",
  },
  {
    question: "How do I adjust zoom level?",
    answer:
      "While the lens is active, use a pinch gesture directly on the lens to zoom in or out. You can also use the zoom slider in the control panel for finer control. Double-tap the lens to reset to default zoom.",
  },
  {
    question: "Can I use Percivo with any app?",
    answer:
      "Yes. Percivo uses the Accessibility Service to overlay a magnification lens on top of any application, including system apps and third-party apps.",
  },
  {
    question: "What does Always-On mode do?",
    answer:
      "Always-On keeps Percivo active when you switch between apps. The zoom level resets on app switch, but the lens stays ready to activate immediately.",
  },
  {
    question: "Does Percivo record or transmit my screen?",
    answer:
      "No. Percivo performs all processing locally on your device. No screen content, personal data, or usage information is collected, stored, or transmitted.",
  },
  {
    question:
      "The triple-tap shortcut activates accidentally. How do I fix it?",
    answer:
      "You can disable triple-tap as an activation method in the Shortcut settings on the home screen. Use the Shortcut row to configure only the methods you prefer.",
  },
];

const SHORTCUT_GUIDE = [
  {
    icon: "human",
    title: "Accessibility Button",
    steps: [
      "Enable the Accessibility Service for Percivo in Android Settings.",
      "A floating button appears on screen.",
      "Tap it to toggle magnification on or off.",
    ],
  },
  {
    icon: "volume-high",
    title: "Volume Keys",
    steps: [
      "Enable the Accessibility Service for Percivo.",
      "Press and hold both volume up and volume down simultaneously.",
      "Hold for 3 seconds until magnification activates.",
      "Repeat to deactivate.",
    ],
  },
  {
    icon: "gesture-tap",
    title: "Triple Tap",
    steps: [
      "Enable the Accessibility Service for Percivo.",
      "Tap the screen three times in quick succession.",
      "The lens will appear immediately.",
      "Triple tap again to dismiss.",
    ],
  },
];

const TROUBLESHOOTING = [
  {
    icon: "alert-circle-outline",
    title: "Lens not showing",
    fix: 'Grant "Display over other apps" permission and ensure the Accessibility Service is active.',
  },
  {
    icon: "lightning-bolt-outline",
    title: "Shortcuts not responding",
    fix: "Check that the Accessibility Service is running and the shortcut method is selected in Settings.",
  },
  {
    icon: "battery-outline",
    title: "Percivo stops in background",
    fix: 'Disable battery optimization for Percivo: Settings → Battery → Percivo → "Don\'t optimize".',
  },
  {
    icon: "refresh",
    title: "App behaving unexpectedly",
    fix: 'Try using "Reset to Default" on the home screen, then reconfigure your preferences.',
  },
];

function SectionHeader({
  title,
  palette,
}: {
  title: string;
  palette: (typeof Colors)["light"];
}) {
  return (
    <Text
      className="text-xs font-bold tracking-widest uppercase mb-3 mt-6 px-1"
      style={{ color: palette.textSecondary }}
    >
      {title}
    </Text>
  );
}

function FaqItem({
  question,
  answer,
  palette,
}: {
  question: string;
  answer: string;
  palette: (typeof Colors)["light"];
}) {
  const [open, setOpen] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setOpen((v) => !v)}
      activeOpacity={0.8}
      className="rounded-2xl mb-3 px-4 py-3.5 overflow-hidden"
      style={{
        backgroundColor: palette.surface,
        borderWidth: 1,
        borderColor: open ? palette.accent + "60" : palette.border,
      }}
    >
      <View
        className="flex-row items-center justify-between"
        style={{ gap: 10 }}
      >
        <Text
          className="flex-1 text-sm font-semibold leading-5"
          style={{ color: palette.text }}
        >
          {question}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={16}
          color={palette.textSecondary}
        />
      </View>
      {open && (
        <Text
          className="text-sm leading-5 mt-3"
          style={{ color: palette.textSecondary }}
        >
          {answer}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default function HelpScreen({ onBack }: HelpScreenProps) {
  const { colorPalette } = useTheme();
  const palette = Colors[colorPalette];

  return (
    <View className="flex-1" style={{ backgroundColor: palette.background }}>
      <View
        className="flex-row items-center px-5 pt-14 pb-4"
        style={{ gap: 12 }}
      >
        <TouchableOpacity
          onPress={onBack}
          className="w-9 h-9 rounded-full items-center justify-center"
          style={{
            backgroundColor: palette.surface,
            borderWidth: 1,
            borderColor: palette.border,
          }}
        >
          <Ionicons name="arrow-back" size={18} color={palette.text} />
        </TouchableOpacity>
        <View>
          <Text
            className="text-xl font-extrabold tracking-tight"
            style={{ color: palette.text }}
          >
            Help
          </Text>
          <Text
            className="text-xs mt-0.5"
            style={{ color: palette.textSecondary }}
          >
            Guides, FAQs & Troubleshooting
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="How to Use Shortcuts" palette={palette} />
        {SHORTCUT_GUIDE.map((item, i) => (
          <View
            key={i}
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
                  name={item.icon as any}
                  size={18}
                  color={palette.accent}
                />
              </View>
              <Text
                className="text-sm font-bold"
                style={{ color: palette.text }}
              >
                {item.title}
              </Text>
            </View>
            {item.steps.map((step, j) => (
              <View
                key={j}
                className="flex-row items-start mb-2"
                style={{ gap: 10 }}
              >
                <View
                  className="w-5 h-5 rounded-full items-center justify-center mt-0.5"
                  style={{ backgroundColor: palette.accent + "18" }}
                >
                  <Text
                    className="text-xs font-bold"
                    style={{ color: palette.accent }}
                  >
                    {j + 1}
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
        ))}

        <SectionHeader title="Frequently Asked Questions" palette={palette} />
        {FAQ_ITEMS.map((item, i) => (
          <FaqItem
            key={i}
            question={item.question}
            answer={item.answer}
            palette={palette}
          />
        ))}

        <SectionHeader title="Troubleshooting" palette={palette} />
        {TROUBLESHOOTING.map((item, i) => (
          <View
            key={i}
            className="flex-row items-start rounded-2xl p-4 mb-3"
            style={{
              backgroundColor: palette.surface,
              borderWidth: 1,
              borderColor: palette.border,
              gap: 12,
            }}
          >
            <View
              className="w-8 h-8 rounded-xl items-center justify-center mt-0.5"
              style={{ backgroundColor: "#EF444418" }}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={18}
                color="#EF4444"
              />
            </View>
            <View className="flex-1">
              <Text
                className="text-sm font-bold mb-1"
                style={{ color: palette.text }}
              >
                {item.title}
              </Text>
              <Text
                className="text-sm leading-5"
                style={{ color: palette.textSecondary }}
              >
                {item.fix}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
