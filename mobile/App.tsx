import Onboarding from "@/components/Onboarding";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AboutScreen from "@/screens/AboutScreen";
import HelpScreen from "@/screens/HelpScreen";
import HomeScreen from "@/screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import "./global.css";

export type Screen = "home" | "help" | "about";

export interface AppSettings {
  alwaysOn: boolean;
  shortcutEnabled: boolean;
  shortcutModes: string[];
  magnificationMode: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  alwaysOn: false,
  shortcutEnabled: false,
  shortcutModes: [],
  magnificationMode: "full_screen",
};

export default function RootLayout() {
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(
    null,
  );
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const [onboarding, ao, se, sm, mm] = await Promise.all([
          AsyncStorage.getItem("onboardingComplete"),
          AsyncStorage.getItem("alwaysOn"),
          AsyncStorage.getItem("shortcutEnabled"),
          AsyncStorage.getItem("shortcutModes"),
          AsyncStorage.getItem("magnificationMode"),
        ]);
        setOnboardingComplete(onboarding === "true");
        setSettings({
          alwaysOn: ao === "true",
          shortcutEnabled: se === "true",
          shortcutModes: sm ? JSON.parse(sm) : [],
          magnificationMode: mm ?? "full_screen",
        });
      } catch {
        setOnboardingComplete(false);
        setSettings(DEFAULT_SETTINGS);
      } finally {
        setSettingsLoaded(true);
      }
    };
    init();
  }, []);

  if (!settingsLoaded) {
    return <View className="flex-1" />;
  }

  const navigate = (screen: Screen) => setCurrentScreen(screen);
  const goHome = () => setCurrentScreen("home");

  if (!onboardingComplete) {
    return (
      <ThemeProvider>
        <View className="flex-1">
          <Onboarding onComplete={() => setOnboardingComplete(true)} />
        </View>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <View className="flex-1">
        {currentScreen === "home" && (
          <HomeScreen
            navigate={navigate}
            initialSettings={settings}
            onSettingsChange={setSettings}
          />
        )}
        {currentScreen === "help" && <HelpScreen onBack={goHome} />}
        {currentScreen === "about" && <AboutScreen onBack={goHome} />}
      </View>
    </ThemeProvider>
  );
}
