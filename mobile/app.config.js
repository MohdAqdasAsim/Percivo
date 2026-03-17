export default {
  expo: {
    name: "Percivo",
    slug: "percivo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "percivo",
    deepLinking: true,
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.percivo",
    },

    android: {
      package: "com.percivo",
      versionCode: 1,
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.percivo",
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#ffffff",
      },
      splash: {
        image: "./assets/images/favicon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: ["expo-router", "expo-font", "expo-image", "expo-web-browser"],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      eas: {
        projectId: "69a41ca5-b695-428a-bbd2-20e4bcdfd3d9",
      },
    },
  },
};
