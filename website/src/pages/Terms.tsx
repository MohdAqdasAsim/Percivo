import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import {
  TERMS_TOC,
  APP_NAME,
  GITHUB_ISSUES,
  WEBSITE_URL,
  GITHUB_URL,
  LAST_UPDATED,
} from "../constants";

const sections: { id: string; title: string; body: string }[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: `By downloading, installing, or using ${APP_NAME} (the "Application"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Application.`,
  },
  {
    id: "description",
    title: "2. Description of Service",
    body: `${APP_NAME} is a mobile accessibility utility for Android devices that provides floating magnification functionality via Android's Accessibility Service API. It renders magnified views of screen content in real time, overlaid on top of any application.`,
  },
  {
    id: "license",
    title: "3. License Grant",
    body: `Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to install and use the Application on Android devices you own or control, solely for personal, non-commercial purposes.`,
  },
  {
    id: "permissions",
    title: "4. Permissions & Data Handling",
    body: `${APP_NAME} requires ACCESSIBILITY_SERVICE (to render the overlay), SYSTEM_ALERT_WINDOW (to display the floating lens), and FOREGROUND_SERVICE (to maintain the service during use). Critically, ${APP_NAME} does not collect, store, transmit, or share any screen content, user data, or personal information. All processing is local and on-device only.`,
  },
  {
    id: "oss",
    title: "5. Open Source License",
    body: `${APP_NAME} is released under the MIT License. Source code is available at ${GITHUB_URL}. You may use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the MIT License terms included in the repository.`,
  },
  {
    id: "warranty",
    title: "6. Disclaimer of Warranties",
    body: 'THE APPLICATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APPLICATION WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.',
  },
  {
    id: "liability",
    title: "7. Limitation of Liability",
    body: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE AUTHOR OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY ARISING FROM, OUT OF, OR IN CONNECTION WITH THE APPLICATION OR ITS USE.",
  },
  {
    id: "mods",
    title: "8. Modifications to Terms",
    body: "We reserve the right to update these Terms at any time. Significant changes will be reflected by updating the last-modified date. Continued use of the Application after changes constitutes acceptance of the revised Terms.",
  },
  {
    id: "governing",
    title: "9. Governing Law",
    body: "These Terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be subject to the exclusive jurisdiction of the competent courts.",
  },
  {
    id: "contact",
    title: "10. Contact",
    body: `For questions about these Terms, open an issue at ${GITHUB_ISSUES} or visit ${WEBSITE_URL}.`,
  },
];

export default function Terms() {
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
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-275 mx-auto px-6 flex gap-12 w-full items-start">
        <aside className="hidden lg:block w-55 shrink-0 sticky top-24">
          <p className="text-[10.5px] font-semibold tracking-widest uppercase text-[#3d4560] mb-3.5 font-sans">
            Contents
          </p>
          <nav className="flex flex-col gap-0.5">
            {TERMS_TOC.map((t) => (
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
              <div className="w-11 h-11 rounded-[14px] bg-linear-to-br from-blue-500 to-teal-400 flex items-center justify-center shrink-0">
                <FileText size={20} className="text-white" />
              </div>
              <h1 className="font-display font-extrabold text-[30px] text-[#f0f4ff] tracking-[-0.035em]">
                Terms of Service
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
            className="px-4.5 py-3.5 rounded-xl bg-blue-500/6 border border-blue-500/15 mb-10"
          >
            <p className="text-[13.5px] text-[#8b95ae] leading-[1.72] font-sans">
              Please read these Terms carefully before using {APP_NAME}. They
              govern your access to and use of the application.
            </p>
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
