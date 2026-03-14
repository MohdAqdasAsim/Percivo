import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  Maximize2,
  Layers,
  Fingerprint,
  Volume2,
  Move,
  ZoomIn,
  SlidersHorizontal,
  LayoutGrid,
  Repeat,
  ScrollText,
  Focus,
  type LucideIcon,
} from "lucide-react";
import { FEATURES } from "../../constants";

const ICON_MAP: Record<string, LucideIcon> = {
  lens: Search,
  fullscreen: Maximize2,
  hybrid: Layers,
  triple_tap: Fingerprint,
  volume: Volume2,
  drag: Move,
  pinch: ZoomIn,
  slider: SlidersHorizontal,
  sizes: LayoutGrid,
  always_on: Repeat,
  scroll: ScrollText,
  temp: Focus,
};

const CATEGORIES = [
  {
    id: "modes",
    label: "Magnification Modes",
    description: "Three distinct ways to see your screen more clearly.",
    accentColor: "#3b82f6",
    features: ["lens", "fullscreen", "hybrid"],
    layout: "hero",
  },
  {
    id: "activation",
    label: "Activation Methods",
    description: "Trigger magnification your way — no interruptions.",
    accentColor: "#f59e0b",
    features: ["triple_tap", "volume", "temp"],
    layout: "activation",
  },
  {
    id: "controls",
    label: "Lens Controls",
    description: "Precise tools to customize your view on the fly.",
    accentColor: "#2dd4bf",
    features: ["drag", "pinch", "slider", "sizes", "always_on", "scroll"],
    layout: "compact",
  },
] as const;

function CategoryLabel({
  label,
  color,
  description,
}: {
  label: string;
  color: string;
  description: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 mb-5">
      <div className="flex items-center gap-2.5">
        <div className="w-1 h-5 rounded-full" style={{ background: color }} />
        <span className="font-display font-bold text-[15px] text-[#f0f4ff] tracking-[-0.01em]">
          {label}
        </span>
      </div>
      <span className="text-[12px] text-[#3d4560] font-sans pl-3.5 sm:pl-0">
        {description}
      </span>
    </div>
  );
}

function HeroCard({
  f,
  index,
  inView,
}: {
  f: (typeof FEATURES)[number];
  index: number;
  inView: boolean;
}) {
  const Icon = ICON_MAP[f.id] ?? Search;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative flex flex-col p-6 rounded-2xl bg-white/2 border border-white/6 cursor-default overflow-hidden group transition-[border-color] duration-300"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${f.color}35`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.07)";
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${f.color}08 0%, transparent 70%)`,
        }}
      />
      <div className="flex items-start justify-between mb-auto">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `${f.color}14`,
            border: `1px solid ${f.color}28`,
          }}
        >
          <Icon size={20} style={{ color: f.color }} />
        </div>
        <span
          className="font-display font-black text-[40px] leading-none tracking-[-0.05em] select-none"
          style={{ color: `${f.color}14` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-10">
        <h3 className="font-display font-bold text-[16px] text-[#f0f4ff] mb-2 tracking-[-0.015em]">
          {f.title}
        </h3>
        <p className="text-[13px] text-[#8b95ae] leading-[1.68] font-sans">
          {f.desc}
        </p>
      </div>
      <div
        className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${f.color}50, transparent)`,
        }}
      />
    </motion.div>
  );
}

function ActivationCard({
  f,
  index,
  inView,
  baseDelay,
}: {
  f: (typeof FEATURES)[number];
  index: number;
  inView: boolean;
  baseDelay: number;
}) {
  const Icon = ICON_MAP[f.id] ?? Search;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: baseDelay + index * 0.07 }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="flex flex-col gap-4 p-5 rounded-xl bg-white/2 border border-white/6 cursor-default transition-[border-color,background] duration-200 group"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${f.color}30`;
        (e.currentTarget as HTMLElement).style.background = `${f.color}05`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLElement).style.background =
          "rgba(255,255,255,0.02)";
      }}
    >
      <div
        className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
        style={{ background: `${f.color}14`, border: `1px solid ${f.color}28` }}
      >
        <Icon size={18} style={{ color: f.color }} />
      </div>
      <div>
        <h3 className="font-display font-bold text-[14px] text-[#f0f4ff] mb-1.5 tracking-[-0.01em]">
          {f.title}
        </h3>
        <p className="text-[12.5px] text-[#8b95ae] leading-[1.62] font-sans">
          {f.desc}
        </p>
      </div>
    </motion.div>
  );
}

function CompactCard({
  f,
  index,
  inView,
  baseDelay,
}: {
  f: (typeof FEATURES)[number];
  index: number;
  inView: boolean;
  baseDelay: number;
}) {
  const Icon = ICON_MAP[f.id] ?? Search;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: baseDelay + index * 0.05 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="flex flex-col gap-3 p-4 rounded-xl bg-white/2 border border-white/6 cursor-default transition-[border-color] duration-200"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${f.color}28`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.06)";
      }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: `${f.color}14`,
            border: `1px solid ${f.color}22`,
          }}
        >
          <Icon size={14} style={{ color: f.color }} />
        </div>
        <h3 className="font-display font-bold text-[13px] text-[#f0f4ff] tracking-[-0.01em] leading-tight">
          {f.title}
        </h3>
      </div>
      <p className="text-[11.5px] text-[#8b95ae] leading-[1.62] font-sans">
        {f.desc}
      </p>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const featureMap = Object.fromEntries(FEATURES.map((f) => [f.id, f]));
  const categoryDelays = [0, 0.24, 0.48];

  return (
    <section id="features" className="py-28 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/[0.07] to-transparent" />

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
              Capabilities
            </span>
          </div>
          <h2
            className="font-display font-extrabold tracking-[-0.035em] text-[#f0f4ff] leading-[1.08] mb-4"
            style={{ fontSize: "clamp(32px,5vw,52px)" }}
          >
            Powerful features,{" "}
            <span className="bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              zero compromise.
            </span>
          </h2>
          <p className="text-base text-[#8b95ae] max-w-130 mx-auto font-sans">
            Every feature is engineered for clarity and accessibility — working
            on top of any Android app without modification.
          </p>
        </motion.div>

        <div ref={ref} className="flex flex-col gap-14">
          {CATEGORIES.map((cat, catIndex) => {
            const baseDelay = categoryDelays[catIndex];
            const catFeatures = cat.features
              .map((id) => featureMap[id])
              .filter(Boolean);

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: baseDelay }}
              >
                <CategoryLabel
                  label={cat.label}
                  color={cat.accentColor}
                  description={cat.description}
                />

                {cat.layout === "hero" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {catFeatures.map((f, i) => (
                      <HeroCard key={f.id} f={f} index={i} inView={inView} />
                    ))}
                  </div>
                )}

                {cat.layout === "activation" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {catFeatures.map((f, i) => (
                      <ActivationCard
                        key={f.id}
                        f={f}
                        index={i}
                        inView={inView}
                        baseDelay={baseDelay}
                      />
                    ))}
                  </div>
                )}

                {cat.layout === "compact" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {catFeatures.map((f, i) => (
                      <CompactCard
                        key={f.id}
                        f={f}
                        index={i}
                        inView={inView}
                        baseDelay={baseDelay}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
