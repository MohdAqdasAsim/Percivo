export const APP_NAME        = "Percivo";
export const APP_TAGLINE     = "A floating magnification lens for Android — read anything, anywhere.";
export const APP_DESCRIPTION = "Percivo is a floating magnification lens for Android. It works on top of any app, giving you instant, precise zoom exactly where you need it.";
export const DEVELOPER       = "Mohd Aqdas Asim";
export const LAST_UPDATED    = "March 10, 2026";
export const APP_VERSION     = "1.0.0";
export const LAUNCH_ETA      = "Q2 2026";
export const LICENSE         = "MIT";

export const PLAY_STORE_URL  = "https://play.google.com/store/apps/details?id=com.percivo";
export const GITHUB_URL      = "https://github.com/MohdAqdasAsim/Percivo";
export const GITHUB_ISSUES   = "https://github.com/MohdAqdasAsim/Percivo/issues";
export const GITHUB_DISCUSS  = "https://github.com/MohdAqdasAsim/Percivo/discussions";
export const WEBSITE_URL     = "https://getpercivo.web.app";

export const COLORS = {
  bg:           "#07090e",
  bgAlt:        "#0b0e16",
  bgCard:       "#0f1219",
  surface:      "#151926",
  blue:         "#3b82f6",
  blueLight:    "#60a5fa",
  teal:         "#2dd4bf",
  border:       "rgba(255,255,255,0.06)",
  borderHover:  "rgba(255,255,255,0.12)",
  txt:          "#f0f4ff",
  txtSecondary: "#8b95ae",
  txtMuted:     "#3d4560",
} as const;

export const NAV_LINKS = [
  { label: "Features",   href: "/#features"  },
  { label: "Glimpse",href: "/#glimpse"   },
  { label: "About",      href: "/#about"     },
  { label: "Download",   href: "/#download"  },
] as const;

export const FOOTER_APP_LINKS = [
  { label: "Features",   href: "/#features",  ext: false },
  { label: "Glimpse",href: "/#glimpse",   ext: false },
  { label: "About",      href: "/#about",     ext: false },
  { label: "Download",   href: "/#download",  ext: false },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy",   to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms-of-service"   },
] as const;

export const FOOTER_PROJECT_LINKS = [
  { label: "GitHub",      href: GITHUB_URL,      ext: true },
  { label: "Issues",      href: GITHUB_ISSUES,   ext: true },
  { label: "Discussions", href: GITHUB_DISCUSS,  ext: true },
  { label: "Website",     href: WEBSITE_URL,     ext: true },
] as const;

export const NOT_FOUND_QUICK_LINKS = [
  { label: "Features",        href: "/#features" },
  { label: "Download",        href: "/#download" },
  { label: "Privacy Policy",  href: "/privacy"   },
  { label: "Terms of Service",href: "/terms"     },
] as const;

export const FEATURES = [
  { id: "lens",        title: "Floating Lens Mode",    desc: "A draggable lens overlays any screen, magnifying content in real time without leaving your current app.",      color: "#3b82f6" },
  { id: "fullscreen",  title: "Full-Screen Mode",       desc: "Magnify your entire display for maximum readability — perfect for dense documents or small-print interfaces.", color: "#2dd4bf" },
  { id: "hybrid",      title: "Hybrid Mode",            desc: "Seamlessly switch between lens overlay and full-screen magnification in a single fluid interaction.",          color: "#818cf8" },
  { id: "triple_tap",  title: "Triple-Tap Activation",  desc: "Tap any part of the screen three times to instantly toggle the magnification lens on or off.",                 color: "#f59e0b" },
  { id: "volume",      title: "Volume Shortcut",        desc: "Hold both volume buttons simultaneously to activate magnification without touching the screen.",               color: "#f472b6" },
  { id: "drag",        title: "Draggable Lens",         desc: "Move the floating lens freely across your screen to inspect any content with precision.",                      color: "#34d399" },
  { id: "pinch",       title: "Pinch-to-Zoom",          desc: "Use natural two-finger pinch gestures on the lens to increase or decrease magnification smoothly.",           color: "#60a5fa" },
  { id: "slider",      title: "Zoom Level Slider",      desc: "Fine-tune your exact zoom level via an always-accessible on-screen slider control.",                          color: "#a78bfa" },
  { id: "sizes",       title: "Adjustable Lens Sizes",  desc: "Select from small, medium, large, or full-width lens profiles to match your reading context.",                 color: "#2dd4bf" },
  { id: "always_on",   title: "Always-On Mode",         desc: "Keep magnification active as you switch between apps — zoom resets per app, but the lens stays ready.",        color: "#fbbf24" },
  { id: "scroll",      title: "Smooth Scrolling",       desc: "Read long content comfortably with optional smooth scrolling inside the magnified lens view.",                 color: "#f87171" },
  { id: "temp",        title: "Temp Magnification",     desc: "Press and hold anywhere to magnify that spot temporarily — release to instantly dismiss.",                    color: "#38bdf8" },
] as const;

export const TESTIMONIALS = [
  { quote: "Percivo genuinely changed how I use my phone. I can finally read small print in documents without squinting or zooming the whole screen.", name: "Sarah K.",  role: "Low Vision User",         initials: "SK", color: "#3b82f6" },
  { quote: "As a developer I use it all the time to inspect UI elements in other apps. The floating lens is incredibly precise and non-intrusive.",     name: "Marcus T.", role: "Android Developer",        initials: "MT", color: "#818cf8" },
  { quote: "My mother has trouble reading small text. Percivo was exactly what she needed — simple to activate, works everywhere.",                      name: "Priya M.",  role: "Caregiver",               initials: "PM", color: "#2dd4bf" },
  { quote: "The triple-tap activation is genius. So fast and intuitive. I've tried every other magnification app — nothing comes close.",               name: "James R.",  role: "Accessibility Advocate",  initials: "JR", color: "#f59e0b" },
  { quote: "I design mobile interfaces professionally. Percivo is my go-to for checking fine details and accessibility compliance in live apps.",        name: "Yuki L.",   role: "UI/UX Designer",          initials: "YL", color: "#f472b6" },
  { quote: "Always-On mode is perfect. I keep it active all day and it never gets in the way — it just works when I need it most.",                    name: "David O.",  role: "Senior User",             initials: "DO", color: "#38bdf8" },
] as const;

export const ROADMAP = [
  { v: "1.0.0", label: "Initial Release",    detail: "Core lens mode, full-screen mode, all activation methods",             status: "active",  est: "Q2 2026" },
  { v: "1.1.0", label: "Enhanced Controls",  detail: "Hybrid mode, smooth scrolling, always-on persistence",                 status: "planned", est: "Q3 2026" },
  { v: "1.2.0", label: "Visual Filters",     detail: "High contrast, inverted colors, custom lens shapes",                   status: "planned", est: "Q4 2026" },
  { v: "1.3.0", label: "Personalization",    detail: "Gesture customization, accessibility profiles, per-app settings",      status: "planned", est: "Q1 2027" },
  { v: "2.0.0", label: "Platform Expansion", detail: "Tablet support, ChromeOS compatibility, widget shortcuts",             status: "planned", est: "Q3 2027" },
] as const;

export const APP_STATS = [
  { value: "Android 8+", label: "Compatible"   },
  { value: "MIT",        label: "Open Source"  },
  { value: "No Data",     label: "Collected"    },
] as const;

export const PERMISSIONS = [
  { name: "ACCESSIBILITY_SERVICE",  purpose: "Render the magnification overlay over other applications",  sensitive: true  },
  { name: "SYSTEM_ALERT_WINDOW",    purpose: "Display the floating lens window above other apps",          sensitive: true  },
  { name: "FOREGROUND_SERVICE",     purpose: "Maintain the magnification service while active",            sensitive: false },
] as const;

export const PRIVACY_TOC = [
  { id: "intro",      label: "Introduction"            },
  { id: "nocollect",  label: "What We Don't Collect"   },
  { id: "perms",      label: "Permissions Explained"   },
  { id: "local",      label: "Local Processing Only"   },
  { id: "third",      label: "Third-Party Services"    },
  { id: "children",   label: "Children's Privacy"      },
  { id: "opensource", label: "Open Source"             },
  { id: "changes",    label: "Changes to This Policy"  },
  { id: "contact",    label: "Contact"                 },
] as const;

export const TERMS_TOC = [
  { id: "acceptance",  label: "Acceptance of Terms"   },
  { id: "description", label: "Description of Service"},
  { id: "license",     label: "License Grant"         },
  { id: "permissions", label: "Permissions & Data"    },
  { id: "oss",         label: "Open Source License"   },
  { id: "warranty",    label: "Disclaimer of Warranties"},
  { id: "liability",   label: "Limitation of Liability"},
  { id: "mods",        label: "Modifications to Terms"},
  { id: "governing",   label: "Governing Law"         },
  { id: "contact",     label: "Contact"               },
] as const;

export const PRIVACY_HIGHLIGHTS = [
  "Zero data collected",
  "No analytics or tracking",
  "No network requests",
  "100% on-device processing",
  "Open source & auditable",
  "No third-party SDKs",
] as const;