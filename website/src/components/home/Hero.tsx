import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { ArrowRight, Search, ChevronDown, Sparkles } from "lucide-react";
import { APP_NAME, APP_STATS } from "../../constants";
import PlayBadge from "../common/PlayBadge";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay } as Transition,
});

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,149,174,0.2) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.12)_0%,transparent_70%)]" />

      <div className="absolute bottom-0 left-0 right-0 h-50 bg-linear-to-t from-[#07090e] to-transparent" />

      <div className="max-w-225 mx-auto px-6 py-20 flex flex-col items-center text-center relative z-10">
        <motion.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-1.5 px-3 py-1.25 pl-2 rounded-full bg-blue-500/8 border border-blue-500/20 mb-8"
        >
          <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-blue-500/20">
            <Sparkles size={10} className="text-blue-400" />
          </span>
          <span className="text-[12px] text-blue-400 font-medium tracking-[0.01em] font-sans">
            Active Development
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="font-display font-extrabold tracking-[-0.04em] leading-[1.04] text-[#f0f4ff] mb-5.5"
          style={{ fontSize: "clamp(44px,7vw,80px)" }}
        >
          Read anything,{" "}
          <span className="bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            anywhere.
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.14)}
          className="text-[#8b95ae] leading-[1.65] max-w-135 mb-10 font-sans"
          style={{ fontSize: "clamp(16px,2vw,19px)" }}
        >
          {APP_NAME} is a floating magnification lens for Android that works on
          top of any app — giving you instant, precise zoom exactly where you
          need it.
        </motion.p>

        <motion.div
          {...fadeUp(0.2)}
          className="flex sm:flex-row flex-col-reverse gap-3 justify-center mb-16 items-center"
        >
          <PlayBadge size="lg" />
          <motion.button
            onClick={() => scrollTo("features")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6.25 py-4 rounded-[14px] bg-white/4 border border-white/10 text-[#f0f4ff] font-medium text-[15px] cursor-pointer font-sans transition-colors duration-200 hover:bg-white/[0.07]"
          >
            Explore Features <ArrowRight size={16} />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-60"
        >
          <div className="absolute -inset-7.5 rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.2)_0%,transparent_70%)] blur-xl" />

          <div className="relative w-60 h-120 rounded-[40px] bg-[#0d1117] border border-white/10 overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.07)]">
            <div className="absolute inset-1.5 rounded-[34px] bg-[#080a0f] overflow-hidden">
              <div className="flex justify-between items-center px-4 pt-3 pb-1.5">
                <span className="text-[10px] text-[#3d4560]">9:41</span>
                <div className="flex gap-0.75">
                  <div className="w-3.5 h-1.5 rounded-[3px] bg-blue-500" />
                  <div className="w-1.25 h-1.5 rounded-xs bg-blue-500 opacity-50" />
                </div>
              </div>

              <div className="px-3.5 pt-2 flex flex-col gap-1.75">
                <div className="h-2.5 w-[70%] rounded-md bg-blue-500/20" />
                {[100, 88, 76, 92, 68, 80].map((w, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-sm bg-white/5"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-27.5 left-1/2 -translate-x-1/2 w-27.5 h-27.5 rounded-full bg-blue-500/8 border border-blue-500/50 flex items-center justify-center backdrop-blur-xs shadow-[0_0_24px_rgba(59,130,246,0.25)]"
              >
                <Search size={26} className="text-blue-500" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-1.25 rounded-full bg-blue-500/50" />
              </motion.div>

              <div className="absolute bottom-8 left-3.5 right-3.5 flex flex-col gap-1.75">
                {[80, 60, 72].map((w, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-sm bg-white/5"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>

              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-15 h-1 rounded-full bg-white/10" />
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="absolute top-15 -left-15 px-3 py-2 rounded-[10px] bg-[rgba(11,14,22,0.9)] border border-blue-500/25 backdrop-blur-xl"
          >
            <div className="text-[12px] font-semibold text-blue-400">
              3× Zoom
            </div>
            <div className="text-[10px] text-[#8b95ae] mt-px">Real-time</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.3,
            }}
            className="absolute bottom-22.5 -right-19 px-3 py-2 rounded-[10px] bg-[rgba(11,14,22,0.9)] border border-teal-400/25 backdrop-blur-xl"
          >
            <div className="text-[12px] font-semibold text-teal-400">
              Lens Mode
            </div>
            <div className="text-[10px] text-[#8b95ae] mt-px">Any App</div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 flex gap-10 flex-wrap justify-center"
        >
          {APP_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-extrabold text-[20px] tracking-[-0.03em] bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-[11px] text-[#3d4560] mt-0.5 tracking-[0.05em] uppercase font-sans">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex flex-col items-center gap-1.5 text-[#3d4560]"
        >
          <span className="text-[10px] tracking-[0.15em] uppercase font-sans">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            <ChevronDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
