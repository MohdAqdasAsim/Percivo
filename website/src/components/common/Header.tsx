import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import PlayBadge from "./PlayBadge";
import { NAV_LINKS } from "../../constants";
import { Logo } from "./Logo";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }

    setMobileOpen(false);
  };

  const scrollTo = (href: string) => {
    if (!href.startsWith("/#")) {
      navigate(href);
      return;
    }
    const id = href.slice(2);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ${
          scrolled || mobileOpen
            ? "bg-[rgba(7,9,14,0.95)] backdrop-blur-xl border-b border-white/6"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-300 mx-auto px-6 flex items-center justify-between h-16">
          <button
            onClick={handleLogoClick}
            className="bg-transparent border-none cursor-pointer p-0 flex items-center"
            aria-label="Back to top"
          >
            <Logo size="md" noLink />
          </button>

          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((n) => (
              <button
                key={n.label}
                onClick={() => scrollTo(n.href)}
                className="px-3.5 py-1.5 bg-transparent border-none cursor-pointer text-[13.5px] text-[#8b95ae] font-sans rounded-lg tracking-[-0.005em] transition-all duration-200 hover:text-[#f0f4ff]"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <PlayBadge size="sm" />
          </div>

          <button
            className="md:hidden bg-transparent border-none cursor-pointer text-[#8b95ae] p-1 relative z-60"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#07090e] md:hidden"
          >
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(139,149,174,0.2) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_60%,rgba(59,130,246,0.06)_0%,transparent_70%)]" />

            <div className="h-16 shrink-0" />

            <div className="relative flex-1 flex flex-col items-center justify-center gap-0">
              {NAV_LINKS.map((n, i) => (
                <motion.button
                  key={n.label}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.28 }}
                  onClick={() => scrollTo(n.href)}
                  className="
                    w-full max-w-70 text-center
                    py-3.5 px-6
                    bg-transparent border-none cursor-pointer
                    font-display font-bold text-[32px] tracking-[-0.03em]
                    text-[#3d4560]
                    transition-colors duration-150
                    hover:text-[#f0f4ff]
                    active:scale-95
                  "
                >
                  {n.label}
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.28 }}
              className="relative flex flex-col items-center gap-4 px-8 pb-14 pt-6"
            >
              <div className="w-12 h-px bg-white/8 mb-2" />
              <PlayBadge size="lg" />
              <p className="text-[11px] text-[#3d4560] tracking-[0.08em] uppercase font-sans">
                Free · Android 8+ · No data collected
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
