import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import { NOT_FOUND_QUICK_LINKS } from "../constants";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,149,174,0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(59,130,246,0.07)_0%,transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center px-6 relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-18 h-18 rounded-[22px] bg-blue-500/10 border border-blue-500/25 flex items-center justify-center mx-auto mb-7"
        >
          <Search size={28} className="text-blue-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div
            className="font-display font-black tracking-[-0.06em] leading-none mb-4 bg-linear-to-br from-blue-400 via-blue-500 to-teal-400 bg-clip-text text-transparent"
            style={{ fontSize: "clamp(72px,14vw,120px)" }}
          >
            404
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-display text-2xl font-bold text-[#f0f4ff] mb-2.5 tracking-[-0.02em]"
        >
          Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.26 }}
          className="text-[15px] text-[#8b95ae] max-w-95 mx-auto mb-9 leading-relaxed"
        >
          Looks like this page got lost in the magnification. Let's get you back
          on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="flex flex-wrap justify-center gap-2.5"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/"
              className="flex items-center gap-2 px-5.5 py-3 rounded-[11px] bg-linear-to-br from-blue-500 to-teal-400 text-white font-semibold text-sm no-underline shadow-[0_0_20px_rgba(59,130,246,0.25)] font-sans"
            >
              <Home size={15} />
              Back to Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-5 py-3 rounded-[11px] bg-white/4 border border-white/10 text-[#f0f4ff] font-medium text-sm cursor-pointer font-sans"
            >
              <ArrowLeft size={15} />
              Go Back
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {NOT_FOUND_QUICK_LINKS.map((link) =>
            link.href.startsWith("/") && !link.href.startsWith("/#") ? (
              <Link
                key={link.label}
                to={link.href}
                className="px-3 py-1.5 rounded-full bg-white/3 border border-white/[0.07] text-xs text-[#8b95ae] no-underline transition-colors duration-150 hover:text-[#f0f4ff]"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-full bg-white/3 border border-white/[0.07] text-xs text-[#8b95ae] no-underline transition-colors duration-150 hover:text-[#f0f4ff]"
              >
                {link.label}
              </a>
            ),
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
