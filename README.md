<div align="center">

<!-- Logo Placeholder -->
<!-- <img src="assets/logo.png" alt="Percivo Logo" width="120" height="120"> -->

# Percivo

### A floating magnification lens for Android — read anything, anywhere.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Android-green.svg)](https://android.com)
[![Status](https://img.shields.io/badge/status-Active%20Development-orange.svg)]()
[![API](https://img.shields.io/badge/API-26%2B-brightgreen.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>


## Overview

**Percivo** is a mobile accessibility utility that helps users read and inspect small text or UI elements on their Android screens. It provides a **floating magnification lens** that enlarges any portion of the screen in real time — working on top of any application, without requiring the app to natively support zoom.

Percivo is built for clarity. Whether you're reading dense fine print, inspecting a complex UI, or navigating an interface that was not designed with visual accessibility in mind, Percivo gives you instant, precise magnification — exactly where you need it.

> *Percivo* — from Latin, meaning "to perceive clearly."

## Features

### Core Capabilities

- **Floating Magnification Lens** — a resizable, draggable lens overlays any screen content in real time
- **Full-Screen Magnification** — magnify the entire display for maximum readability
- **Hybrid Mode** — seamlessly switch between lens and full-screen magnification
- **Adjustable Zoom** — pinch to zoom or use the slider; supports fine-grained zoom control
- **Multiple Lens Sizes** — choose from small, medium, large, or full-width lens profiles
- **Always-On Mode** — keep magnification active as you move between apps

### Activation Methods

| Method | Description |
|-------|-------------|
| Floating Button | Persistent on-screen accessibility shortcut |
| Triple-Tap Gesture | Tap the screen three times to toggle the lens |
| Volume Shortcut | Hold both volume buttons simultaneously |

### Lens Controls

- Drag handle for repositioning the lens
- Pinch gesture to adjust zoom level
- Zoom level slider for precise control
- Smooth scrolling support
- Press-and-hold for temporary magnification


## How It Works

1. **Activate** — trigger Percivo using any of the supported shortcuts (floating button, triple-tap, or volume hold)
2. **Lens Appears** — a floating magnification lens overlays your current screen
3. **Move & Zoom** — drag the lens to the content you want to inspect; pinch or use the slider to adjust zoom
4. **Dismiss** — swipe the lens away or tap the shortcut again to close

Percivo uses Android's **Accessibility Service API** to render a real-time magnified view of the screen, making it compatible with virtually any application.


## Installation

### Requirements

- Android 8.0 (API level 26) or higher
- Accessibility Service permission

### From Google Play *(coming soon)*

> Play Store listing will be available upon public release.

### Manual Installation (APK)

1. Download the latest APK from the [Releases](https://github.com/percivo/percivo/releases) page
2. On your device, enable **Install from Unknown Sources** in Settings → Security
3. Open the downloaded APK and follow the installation prompts
4. Grant the required permissions when prompted

### Build from Source

```bash
# Clone the repository
git clone https://github.com/MohdAqdasAsim/Percivo.git

# Navigate to the project directory
cd Percivo

# Open in Android Studio, or build via CLI:
eas build --platform android
```

## Usage

### First Launch

1. Open Percivo
2. Tap **Enable Accessibility Service** and grant permission in Android Settings
3. Return to Percivo and configure your preferred activation method
4. Tap **Start** to activate the lens

### Changing Zoom Level

- **Pinch gesture** on the lens to zoom in or out
- Use the **zoom slider** in the control panel for precise adjustments
- Double-tap the lens to reset zoom to default

### Lens Size

Navigate to **Settings → Lens Size** and choose:
- Small
- Medium
- Large
- Full Width

### Always-On Mode

Enable **Settings → Always-On Mode** to keep Percivo active across app switches. Zoom resets when switching apps, but the lens remains ready.


## Permissions

| Permission | Purpose |
|-------|--------------|
| `ACCESSIBILITY_SERVICE` | Required to render the magnification overlay over other apps |
| `SYSTEM_ALERT_WINDOW` | Allows the floating lens to appear above other applications |
| `FOREGROUND_SERVICE` | Keeps the magnification service running while in use |

> Percivo does **not** collect, store, or transmit any screen content or personal data. All processing is performed locally on-device.


## Accessibility Purpose

Percivo was built first and foremost as an **accessibility tool**.

It is designed to serve:

- Users with low vision or visual impairments who benefit from on-demand magnification
- Users who need to read small text in apps that do not support native zoom
- Users in environments where adjusting display settings is inconvenient
- Developers and designers inspecting UI details at a fine level

Percivo complements Android's built-in Magnification feature by offering greater flexibility, faster activation, and a non-intrusive lens overlay that does not disrupt the underlying interface.

## Repository Structure

```
Percivo/
├── app/
├── docs/                             # Additional documentation
├── assets/                           # Logos, screenshots, media
├── wbsite/
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── CHANGELOG.md
├── metadata.yaml
└── LICENSE
```


## Contributing

Contributions are welcome and appreciated. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get started, submit issues, and open pull requests.


## Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold these standards in all project spaces.


## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

<div align="center">

*Built to make every screen readable for everyone.*

</div>