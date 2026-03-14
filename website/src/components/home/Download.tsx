import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import PlayBadge from "../common/PlayBadge";
import { GITHUB_URL } from "../../constants";

function GhostButton({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 px-5.5 py-3.25 rounded-[14px] bg-white/4 border border-white/10 text-[#f0f4ff] font-medium text-[15px] no-underline font-sans transition-colors duration-200 hover:bg-white/[0.07]"
    >
      {icon}
      {children}
    </motion.a>
  );
}

export default function Download() {
  return (
    <section id="download" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/[0.07] to-transparent" />

      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(59,130,246,0.07)_0%,transparent_70%)]" />

      <div className="max-w-210 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2
            className="font-display font-extrabold tracking-[-0.045em] text-[#f0f4ff] leading-[1.04] mb-4.5"
            style={{ fontSize: "clamp(36px,6.5vw,68px)" }}
          >
            Ready to see
            <br />
            <span className="bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              more clearly?
            </span>
          </h2>

          <p className="text-base text-[#8b95ae] max-w-115 mx-auto mb-9 font-sans leading-[1.65]">
            Percivo is available now on Google Play — free, open source, and
            built with your privacy in mind.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <PlayBadge size="lg" />
            <GhostButton href={GITHUB_URL} icon={<Github size={16} />}>
              View on GitHub <ArrowRight size={14} />
            </GhostButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
