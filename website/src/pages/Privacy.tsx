import { motion } from "framer-motion";
import { Shield, CheckCircle2 } from "lucide-react";
import {
  PRIVACY_TOC,
  PRIVACY_HIGHLIGHTS,
  APP_NAME,
  GITHUB_URL,
  GITHUB_ISSUES,
  WEBSITE_URL,
  LAST_UPDATED,
} from "../constants";

const sections: { id: string; title: string; body: string }[] = [
  {
    id: "intro",
    title: "1. Introduction",
    body: `${APP_NAME} is committed to your privacy. This Privacy Policy explains how we handle information when you use the ${APP_NAME} Android application. We are completely transparent: ${APP_NAME} collects no personal data whatsoever.`,
  },
  {
    id: "nocollect",
    title: "2. What We Do Not Collect",
    body: `${APP_NAME} does not collect, store, transmit, or share: screen content or screenshots, personal identification information, usage analytics or telemetry, device identifiers, location data, contact information, or any other form of personal data. All magnification processing occurs entirely on your device.`,
  },
  {
    id: "perms",
    title: "3. Permissions Explained",
    body: `ACCESSIBILITY_SERVICE — used solely to render the magnification overlay. This does not grant remote access to your screen. SYSTEM_ALERT_WINDOW — allows the floating lens to appear above other apps. FOREGROUND_SERVICE — maintains the magnification service while active. None of these permissions are used to collect or transmit any data.`,
  },
  {
    id: "local",
    title: "4. Local Processing Only",
    body: `All of ${APP_NAME}'s functionality runs entirely on your device. There are no remote servers, no cloud processing, no analytics platforms, and no third-party SDKs that collect data. The Application has no network communication for data collection purposes.`,
  },
  {
    id: "third",
    title: "5. Third-Party Services",
    body: `${APP_NAME} does not integrate with any third-party analytics, advertising, or data collection services. Distribution through Google Play Store is subject to Google's own Privacy Policy. Please refer to Google's Privacy Policy for information about data collected through the Play Store.`,
  },
  {
    id: "children",
    title: "6. Children's Privacy",
    body: `Because ${APP_NAME} collects no data from anyone, it is safe for users of all ages, including children under 13.`,
  },
  {
    id: "opensource",
    title: "7. Open Source Transparency",
    body: `${APP_NAME} is fully open source under the MIT License. You can review our complete source code at ${GITHUB_URL} to independently verify our privacy practices. We believe in full transparency.`,
  },
  {
    id: "changes",
    title: "8. Changes to This Policy",
    body: 'We may update this Privacy Policy from time to time. Significant changes will be noted by updating the "last updated" date. Continued use of the Application constitutes acceptance of the updated Policy.',
  },
  {
    id: "contact",
    title: "9. Contact",
    body: `Questions about this Privacy Policy? Open an issue at ${GITHUB_ISSUES} or visit ${WEBSITE_URL}.`,
  },
];

export default function Privacy() {
  return (
    <div className="relative min-h-screen pt-24 pb-24 flex">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,149,174,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(45,212,191,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-275 mx-auto px-6 flex gap-12 w-full items-start">
        <aside className="hidden lg:block w-55 shrink-0 sticky top-24">
          <p className="text-[10.5px] font-semibold tracking-widest uppercase text-[#3d4560] mb-3.5 font-sans">
            Contents
          </p>
          <nav className="flex flex-col gap-0.5">
            {PRIVACY_TOC.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="text-[12.5px] text-[#8b95ae] no-underline px-2.5 py-1.25 rounded-[7px] transition-all duration-150 hover:text-[#f0f4ff] hover:bg-white/5 font-sans"
              >
                {t.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="flex-1 max-w-180">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3.5 mb-2">
              <div className="w-11 h-11 rounded-[14px] bg-linear-to-br from-teal-400 to-blue-500 flex items-center justify-center shrink-0">
                <Shield size={20} className="text-white" />
              </div>
              <h1 className="font-display font-extrabold text-[30px] text-[#f0f4ff] tracking-[-0.035em]">
                Privacy Policy
              </h1>
            </div>
            <p className="text-[12.5px] text-[#3d4560] mb-9 ml-14.5 font-sans">
              Last updated: {LAST_UPDATED}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="px-5.5 py-5 rounded-[14px] bg-teal-400/5 border border-teal-400/18 mb-10"
          >
            <p className="text-[11px] font-semibold text-teal-400 tracking-[0.08em] uppercase mb-3.5 font-sans">
              Privacy at a Glance
            </p>
            <div
              className="grid gap-2.5"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(195px, 1fr))",
              }}
            >
              {PRIVACY_HIGHLIGHTS.map((h) => (
                <div key={h} className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-teal-400 shrink-0" />
                  <span className="text-[13px] text-[#c8d0e0] font-sans">
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div>
            {sections.map((s, i) => (
              <motion.div
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
                className={`pb-7 mb-7 scroll-mt-24 ${
                  i < sections.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <h2 className="font-display font-bold text-base text-[#f0f4ff] mb-2.5 tracking-[-0.015em]">
                  {s.title}
                </h2>
                <p className="text-[14px] text-[#8b95ae] leading-[1.78] font-sans">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
