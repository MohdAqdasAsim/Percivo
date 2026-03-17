import { Colors } from "@/constants/Colors";
import {
  APP_VERSION,
  BUILT_WITH,
  DEVELOPER,
  LICENSE,
  LINKS,
  PLATFORM,
} from "@/constants/Details";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AboutScreenProps {
  onBack: () => void;
}

export default function AboutScreen({ onBack }: AboutScreenProps) {
  const { colorPalette } = useTheme();
  const palette = Colors[colorPalette];

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

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
            About
          </Text>
          <Text
            className="text-xs mt-0.5"
            style={{ color: palette.textSecondary }}
          >
            Percivo
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center py-8" style={{ gap: 12 }}>
          <View
            className="w-20 h-20 rounded-3xl items-center justify-center"
            style={{
              backgroundColor: palette.accent + "18",
              borderWidth: 1.5,
              borderColor: palette.accent + "30",
            }}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={44}
              color={palette.accent}
            />
          </View>
          <Text
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: palette.text }}
          >
            Percivo
          </Text>
          <View
            className="px-3 py-1 rounded-full"
            style={{
              backgroundColor: palette.accent + "18",
              borderWidth: 1,
              borderColor: palette.accent + "30",
            }}
          >
            <Text
              className="text-xs font-bold"
              style={{ color: palette.accent }}
            >
              v{APP_VERSION}
            </Text>
          </View>
          <Text
            className="text-sm text-center leading-6"
            style={{ color: palette.textSecondary, maxWidth: 300 }}
          >
            A floating magnification lens for Android — read anything, anywhere.
          </Text>
        </View>

        <View
          className="rounded-2xl p-4 mb-4"
          style={{
            backgroundColor: palette.surface,
            borderWidth: 1,
            borderColor: palette.border,
          }}
        >
          <Text
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: palette.textSecondary }}
          >
            Purpose
          </Text>
          <Text
            className="text-sm leading-6"
            style={{ color: palette.textSecondary }}
          >
            Percivo is an accessibility utility built for users who need
            on-demand magnification without disrupting their workflow. It
            overlays a live, draggable zoom lens on top of any application — no
            need to leave your current screen or adjust system display settings.
          </Text>
          <Text
            className="text-sm leading-6 mt-3"
            style={{ color: palette.textSecondary }}
          >
            Built primarily for users with low vision, Percivo also serves
            developers, designers, and anyone who regularly needs to inspect
            fine UI details or read small text.
          </Text>
        </View>

        <View
          className="rounded-2xl mb-4 overflow-hidden"
          style={{
            backgroundColor: palette.surface,
            borderWidth: 1,
            borderColor: palette.border,
          }}
        >
          {[
            { icon: "account-outline", label: "Developer", value: DEVELOPER },
            { icon: "tag-outline", label: "Version", value: APP_VERSION },
            { icon: "cellphone", label: "Platform", value: PLATFORM },
            { icon: "shield-lock-outline", label: "License", value: LICENSE },
            { icon: "code-tags", label: "Built with", value: BUILT_WITH },
          ].map((item, i, arr) => (
            <View
              key={i}
              className="flex-row items-center px-4 py-3.5"
              style={{
                borderBottomWidth: i < arr.length - 1 ? 1 : 0,
                borderBottomColor: palette.border,
              }}
            >
              <View
                className="w-8 h-8 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: palette.accent + "18" }}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={17}
                  color={palette.accent}
                />
              </View>
              <Text
                className="flex-1 text-sm font-medium"
                style={{ color: palette.textSecondary }}
              >
                {item.label}
              </Text>
              <Text
                className="text-sm font-semibold"
                style={{ color: palette.text }}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        <Text
          className="text-xs font-bold tracking-widest uppercase mb-3 px-1"
          style={{ color: palette.textSecondary }}
        >
          Links
        </Text>
        <View
          className="rounded-2xl mb-4 overflow-hidden"
          style={{
            backgroundColor: palette.surface,
            borderWidth: 1,
            borderColor: palette.border,
          }}
        >
          {[
            { icon: "github", label: "GitHub Repository", url: LINKS.github },
            { icon: "web", label: "Website", url: LINKS.website },
            {
              icon: "bug-outline",
              label: "Report an Issue",
              url: LINKS.issues,
            },
          ].map((item, i, arr) => (
            <TouchableOpacity
              key={i}
              onPress={() => openLink(item.url)}
              activeOpacity={0.7}
              className="flex-row items-center px-4 py-3.5"
              style={{
                borderBottomWidth: i < arr.length - 1 ? 1 : 0,
                borderBottomColor: palette.border,
              }}
            >
              <View
                className="w-8 h-8 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: palette.accent + "18" }}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={17}
                  color={palette.accent}
                />
              </View>
              <Text
                className="flex-1 text-sm font-semibold"
                style={{ color: palette.text }}
              >
                {item.label}
              </Text>
              <Ionicons
                name="open-outline"
                size={15}
                color={palette.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View
          className="rounded-2xl p-4 flex-row items-start"
          style={{
            backgroundColor: palette.accent + "10",
            borderWidth: 1,
            borderColor: palette.accent + "30",
            gap: 12,
          }}
        >
          <MaterialCommunityIcons
            name="heart-outline"
            size={18}
            color={palette.accent}
            style={{ marginTop: 1 }}
          />
          <Text
            className="flex-1 text-sm leading-5"
            style={{ color: palette.textSecondary }}
          >
            Built to make every screen readable for everyone. Contributions and
            feedback are always welcome.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
