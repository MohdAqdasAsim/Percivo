import { motion } from "framer-motion";
import {
  Github,
  Shield,
  Code2,
  Heart,
  ExternalLink,
  Lock,
  CheckCircle2,
} from "lucide-react";
import {
  APP_NAME,
  DEVELOPER,
  GITHUB_URL,
  LICENSE,
  PERMISSIONS,
  PRIVACY_HIGHLIGHTS,
} from "../../constants";

const VALUES = [
  {
    icon: Shield,
    color: "#2dd4bf",
    title: "Privacy first",
    body: "Zero data collection. All magnification runs on-device. No analytics, no servers, no tracking — ever.",
  },
  {
    icon: Code2,
    color: "#3b82f6",
    title: "Open source",
    body: `Licensed under ${LICENSE}. Every line of code is public and auditable at any time on GitHub.`,
  },
  {
    icon: Heart,
    color: "#f472b6",
    title: "Accessibility core",
    body: "Built for users with low vision, visual impairments, or anyone who needs fast, flexible on-demand zoom.",
  },
];

const INITIALS = DEVELOPER.split(" ")
  .map((w) => w[0])
  .join("");

export default function About() {
  return (
    <section id="about" className="py-28 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/7 to-transparent" />

      <div className="max-w-300 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/8 border border-blue-500/18 mb-5">
            <span className="text-[11px] text-blue-400 font-medium tracking-[0.06em] uppercase font-sans">
              About
            </span>
          </div>
          <h2
            className="font-display font-extrabold tracking-[-0.035em] text-[#f0f4ff] leading-[1.08] mb-4"
            style={{ fontSize: "clamp(32px,5vw,52px)" }}
          >
            Built with{" "}
            <span className="bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              purpose.
            </span>
          </h2>
          <p className="text-base text-[#8b95ae] max-w-130 mx-auto font-sans">
            {APP_NAME} exists because every screen should be readable for
            everyone — regardless of vision, age, or the app they're using.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="relative p-6 rounded-2xl bg-white/2 border border-white/6 flex flex-col gap-4 overflow-hidden group cursor-default transition-[border-color] duration-300"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  `${v.color}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.06)";
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${v.color}07 0%, transparent 70%)`,
                }}
              />
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
                style={{
                  background: `${v.color}14`,
                  border: `1px solid ${v.color}28`,
                }}
              >
                <v.icon size={18} style={{ color: v.color }} />
              </div>
              <div>
                <h3 className="font-display font-bold text-[15px] text-[#f0f4ff] mb-1.5 tracking-[-0.01em]">
                  {v.title}
                </h3>
                <p className="text-[13px] text-[#8b95ae] leading-[1.68] font-sans">
                  {v.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-7 rounded-[20px] bg-white/2 border border-white/6 flex flex-col justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-[13px] bg-linear-to-br from-blue-500 to-teal-400 flex items-center justify-center">
                    <span className="font-display font-black text-white text-[15px]">
                      {INITIALS}
                    </span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-teal-400 border-2 border-[#07090e] flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#07090e]" />
                  </div>
                </div>
                <div>
                  <div className="font-display font-bold text-[15px] text-[#f0f4ff] tracking-[-0.01em]">
                    {DEVELOPER}
                  </div>
                  <div className="text-[12px] text-[#8b95ae] font-sans">
                    Creator & Maintainer
                  </div>
                </div>
              </div>

              <p className="text-[13.5px] text-[#8b95ae] leading-[1.72] font-sans">
                {APP_NAME} is an independent open-source project. It was
                designed to fill a real gap — a magnifier that's fast to
                activate, works everywhere, and respects the user's privacy
                completely.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] text-[#8b95ae] no-underline font-sans transition-colors duration-150 hover:text-[#f0f4ff] group"
              >
                <Github size={14} />
                View on GitHub
                <ExternalLink
                  size={11}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                />
              </a>
              <span className="text-[11px] text-[#3d4560] font-mono px-2 py-0.5 rounded bg-white/3 border border-white/5">
                {LICENSE} License
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-7 rounded-[20px] bg-teal-400/4 border border-teal-400/[0.14] flex flex-col gap-5"
          >
            <div className="flex items-center gap-2.5">
              <Lock size={15} className="text-teal-400 shrink-0" />
              <span className="text-[11px] font-semibold text-teal-400 tracking-[0.08em] uppercase font-sans">
                Privacy Promise
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRIVACY_HIGHLIGHTS.map((h) => (
                <div key={h} className="flex items-center gap-2">
                  <CheckCircle2
                    size={12}
                    className="text-teal-400 shrink-0 opacity-80"
                  />
                  <span className="text-[12.5px] text-[#c8d0e0] font-sans">
                    {h}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-teal-400/12" />

            <div>
              <p className="text-[10.5px] font-semibold text-[#3d4560] uppercase tracking-[0.08em] mb-3 font-sans">
                Permissions used
              </p>
              <div className="flex flex-col gap-2">
                {PERMISSIONS.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-[10px] bg-white/3 border border-white/5"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.25 shrink-0"
                      style={{
                        background: p.sensitive ? "#f59e0b" : "#2dd4bf",
                      }}
                    />
                    <div className="min-w-0">
                      <div className="font-mono text-[10.5px] text-blue-400 mb-0.5 truncate">
                        {p.name}
                      </div>
                      <div className="text-[11.5px] text-[#8b95ae] leading-[1.55] font-sans">
                        {p.purpose}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-center pt-2"
        >
          <p className="text-[13px] text-[#3d4560] italic font-sans">
            <span className="text-[#8b95ae] not-italic font-semibold">
              Percivo
            </span>{" "}
            — from Latin, <em>to perceive clearly.</em>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
