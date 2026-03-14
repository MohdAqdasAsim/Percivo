import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Maximize2,
  Layers,
  Fingerprint,
  Volume2,
  Move,
} from "lucide-react";

const TABS = [
  {
    id: "lens",
    label: "Lens Mode",
    icon: Search,
    color: "#3b82f6",
    headline: "Float it. Move it. Read it.",
    body: "A draggable circle of clarity sits above any app. Pinch to zoom, drag to navigate — the rest of your screen stays untouched.",
  },
  {
    id: "fullscreen",
    label: "Full-Screen",
    icon: Maximize2,
    color: "#2dd4bf",
    headline: "The whole display, magnified.",
    body: "Expand your view edge to edge. Perfect for dense documents, tiny menus, or anything that demands total focus.",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    icon: Layers,
    color: "#818cf8",
    headline: "Switch without missing a beat.",
    body: "Start with the lens, scale to full-screen, and jump back — all in one fluid interaction with no mode switching friction.",
  },
  {
    id: "triple",
    label: "Triple-Tap",
    icon: Fingerprint,
    color: "#f59e0b",
    headline: "Three taps. Instant zoom.",
    body: "Tap anywhere on screen three times and Percivo activates instantly. No interruption, no buttons, no context-switching.",
  },
  {
    id: "volume",
    label: "Volume Key",
    icon: Volume2,
    color: "#f472b6",
    headline: "Both buttons. One-handed.",
    body: "Hold both volume keys simultaneously to toggle magnification — perfect when your screen hand is occupied.",
  },
  {
    id: "drag",
    label: "Draggable",
    icon: Move,
    color: "#34d399",
    headline: "Place it exactly where you need.",
    body: "The floating lens follows your finger with zero latency. Grip the handle, position it over any content, and read.",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];
const AUTOPLAY_MS = 3500;

function PhonePreview({ id, color }: { id: TabId; color: string }) {
  return (
    <div className="relative w-50 h-100 rounded-[36px] bg-[#0a0c12] border border-white/9 overflow-hidden shadow-[0_24px_56px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="absolute inset-1.25 rounded-4xl bg-[#07090e] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center px-4 pt-3 pb-1 shrink-0">
          <span className="text-[9px] text-[#3d4560]">9:41</span>
          <div
            className="w-3 h-1.5 rounded-sm"
            style={{ background: color, opacity: 0.7 }}
          />
        </div>

        <div className="px-3 pt-1 flex flex-col gap-1.5 grow">
          <div className="h-2 w-[65%] rounded bg-white/7" />
          {[100, 85, 92, 78, 95, 70, 88].map((w, i) => (
            <div
              key={i}
              className="h-1.25 rounded bg-white/4"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {(id === "lens" || id === "drag") && (
            <motion.div
              key="lens"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute top-27.5 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-22.5 h-22.5 rounded-full flex items-center justify-center backdrop-blur-sm"
                style={{
                  background: `${color}10`,
                  border: `1.5px solid ${color}55`,
                  boxShadow: `0 0 20px ${color}30`,
                }}
              >
                <Search size={22} style={{ color }} />
              </motion.div>
              <div
                className="mx-auto mt-1.5 w-6 h-1 rounded-full opacity-50"
                style={{ background: color }}
              />
            </motion.div>
          )}
          {id === "fullscreen" && (
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 rounded-4xl flex items-center justify-center"
              style={{
                background: `${color}08`,
                border: `1px solid ${color}22`,
              }}
            >
              <div className="text-center">
                <Maximize2
                  size={28}
                  style={{ color }}
                  className="mx-auto mb-2 opacity-80"
                />
                <div
                  className="text-[10px] font-semibold tracking-wide uppercase opacity-60 font-sans"
                  style={{ color }}
                >
                  4× Zoom
                </div>
              </div>
            </motion.div>
          )}
          {id === "hybrid" && (
            <motion.div
              key="hybrid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.6, repeat: Infinity }}
                className="absolute top-25 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full"
                style={{
                  background: `${color}12`,
                  border: `1px solid ${color}40`,
                }}
              />
              <motion.div
                animate={{ scale: [1.08, 1, 1.08] }}
                transition={{ duration: 2.6, repeat: Infinity }}
                className="absolute inset-0 rounded-4xl"
                style={{ border: `1px solid ${color}18` }}
              />
            </motion.div>
          )}
          {id === "triple" && (
            <motion.div
              key="triple"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex gap-2">
                {[0, 0.18, 0.36].map((delay, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay }}
                    className="w-3 h-3 rounded-full"
                    style={{ background: color }}
                  />
                ))}
              </div>
            </motion.div>
          )}
          {id === "volume" && (
            <motion.div
              key="volume"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-32.5 -right-0.5 flex flex-col gap-1"
            >
              {[0, 0.2].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{ x: [0, -3, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay }}
                  className="w-1.5 h-2 rounded-l-sm"
                  style={{ background: `${color}70` }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.75 rounded-full bg-white/8" />
      </div>
    </div>
  );
}

function useSwipe(onLeft: () => void, onRight: () => void) {
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const startX = e.touches[0].clientX;

      const handleTouchEnd = (ev: TouchEvent) => {
        const delta = ev.changedTouches[0].clientX - startX;

        if (Math.abs(delta) > 40) {
          if (delta < 0) {
            onLeft();
          } else {
            onRight();
          }
        }

        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchend", handleTouchEnd);
    },
    [onLeft, onRight],
  );

  return { onTouchStart: handleTouchStart };
}

export default function Glimpse() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const tab = TABS[activeIndex];

  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % TABS.length),
    [],
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + TABS.length) % TABS.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  const swipeHandlers = useSwipe(next, prev);

  return (
    <section id="glimpse" className="py-28 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/7 to-transparent" />

      <div className="max-w-300 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/8 border border-blue-500/18 mb-5">
            <span className="text-[11px] text-blue-400 font-medium tracking-[0.06em] uppercase font-sans">
              App Glimpse
            </span>
          </div>
          <h2
            className="font-display font-extrabold tracking-[-0.035em] text-[#f0f4ff] leading-[1.08] mb-4"
            style={{ fontSize: "clamp(32px,5vw,52px)" }}
          >
            See it in{" "}
            <span className="bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              action.
            </span>
          </h2>
        </motion.div>

        <div
          {...swipeHandlers}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="select-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-center gap-12 justify-center"
            >
              <div className="md:max-w-90 text-center md:text-left">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-[14px] mb-5"
                  style={{
                    background: `${tab.color}14`,
                    border: `1px solid ${tab.color}28`,
                  }}
                >
                  <tab.icon size={22} style={{ color: tab.color }} />
                </div>
                <h3 className="font-display font-bold text-[24px] text-[#f0f4ff] tracking-[-0.025em] mb-3 leading-tight">
                  {tab.headline}
                </h3>
                <p className="text-[15px] text-[#8b95ae] leading-[1.7] font-sans">
                  {tab.body}
                </p>
              </div>

              <div className="relative">
                <div
                  className="absolute -inset-8 rounded-full blur-2xl opacity-20 transition-colors duration-700 pointer-events-none"
                  style={{ background: tab.color }}
                />
                <PhonePreview id={tab.id as TabId} color={tab.color} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2.5 mt-10">
          {TABS.map((t, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveIndex(i);
                  setPaused(true);
                  setTimeout(() => setPaused(false), 6000);
                }}
                className="rounded-full border-none cursor-pointer p-0 transition-all duration-300"
                style={{
                  width: isActive ? 24 : 8,
                  height: 8,
                  background: isActive ? tab.color : "rgba(255,255,255,0.12)",
                }}
                aria-label={t.label}
              />
            );
          })}
        </div>

        <div className="flex justify-center mt-3">
          <div className="w-50 h-px bg-white/5 rounded-full overflow-hidden">
            <motion.div
              key={`${tab.id}-${paused}`}
              initial={{ width: "0%" }}
              animate={{ width: paused ? "0%" : "100%" }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
              className="h-full rounded-full"
              style={{ background: tab.color }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
