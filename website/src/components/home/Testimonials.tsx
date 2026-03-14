import { motion } from "framer-motion";
import { TESTIMONIALS } from "../../constants";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  color: string;
};

const col1 = TESTIMONIALS.filter((_, i) => i % 2 === 0) as Testimonial[];
const col2 = TESTIMONIALS.filter((_, i) => i % 2 !== 0) as Testimonial[];

function Card({ t, delay }: { t: Testimonial; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="px-5 pt-5 pb-5.5 rounded-[14px] bg-white/2 border border-white/6 mb-3 cursor-default transition-[border-color] duration-200"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${t.color}25`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.06)";
      }}
    >
      <div
        className="w-6 h-0.75 rounded-full mb-3.5 opacity-60"
        style={{ background: t.color }}
      />

      <p className="text-[13.5px] text-[#c8d0e0] leading-[1.7] mb-4 font-sans">
        {t.quote}
      </p>

      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
          style={{
            background: `${t.color}14`,
            border: `1px solid ${t.color}28`,
            color: t.color,
          }}
        >
          {t.initials}
        </div>
        <div>
          <div className="text-[13px] font-semibold text-[#f0f4ff] font-display tracking-[-0.01em]">
            {t.name}
          </div>
          <div className="text-[11px] text-[#8b95ae] font-sans">{t.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-28 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="max-w-300 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/8 border border-blue-500/18 mb-5">
            <span className="text-[11px] text-blue-400 font-medium tracking-[0.06em] uppercase font-sans">
              Testimonials
            </span>
          </div>
          <h2
            className="font-display font-extrabold tracking-[-0.035em] text-[#f0f4ff] leading-[1.08] mb-4"
            style={{ fontSize: "clamp(32px,5vw,52px)" }}
          >
            Making screens{" "}
            <span className="bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              easier for everyone.
            </span>
          </h2>
          <p className="text-base text-[#8b95ae] font-sans">
            From everyday users to accessibility professionals — here's what
            they say.
          </p>
        </motion.div>

        <div
          className="grid gap-3 items-start"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          <div>
            {col1.map((t, i) => (
              <Card key={t.name} t={t} delay={i * 0.1} />
            ))}
          </div>
          <div className="mt-6">
            {col2.map((t, i) => (
              <Card key={t.name} t={t} delay={i * 0.1 + 0.05} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
