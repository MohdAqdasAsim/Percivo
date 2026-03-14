import { motion } from "framer-motion";
import { PLAY_STORE_URL } from "../../constants";

function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path d="M2 18.5L10.8 10L2 1.5V18.5Z" fill="#34d399" />
      <path d="M2 1.5L10.8 10L17.2 6.5L2 1.5Z" fill="#60a5fa" />
      <path d="M2 18.5L17.2 13.5L10.8 10L2 18.5Z" fill="#fbbf24" />
      <path d="M17.2 6.5L10.8 10L17.2 13.5V6.5Z" fill="#f0f4ff" />
    </svg>
  );
}

type Size = "sm" | "md" | "lg";

const CONFIG: Record<
  Size,
  {
    padding: string;
    gap: string;
    iconSize: number;
    labelSize: string;
    captionSize: string;
    radius: string;
  }
> = {
  sm: {
    padding: "px-3.5 py-2",
    gap: "gap-[9px]",
    iconSize: 16,
    labelSize: "text-[11px]",
    captionSize: "text-[8px]",
    radius: "rounded-[10px]",
  },
  md: {
    padding: "px-[18px] py-2.5",
    gap: "gap-2.5",
    iconSize: 18,
    labelSize: "text-[12px]",
    captionSize: "text-[9px]",
    radius: "rounded-[12px]",
  },
  lg: {
    padding: "px-[22px] py-[13px]",
    gap: "gap-3",
    iconSize: 22,
    labelSize: "text-sm",
    captionSize: "text-[10px]",
    radius: "rounded-[14px]",
  },
};

export default function PlayBadge({ size = "md" }: { size?: Size }) {
  const c = CONFIG[size];

  return (
    <motion.a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`
        inline-flex items-center ${c.gap} ${c.padding} ${c.radius}
        bg-white/5 border border-white/12
        backdrop-blur-md no-underline cursor-pointer
        transition-[background,border-color,box-shadow] duration-220
        hover:bg-blue-500/10 hover:border-blue-500/40
        hover:shadow-[0_8px_32px_rgba(59,130,246,0.18),0_0_0_1px_rgba(59,130,246,0.1)]
      `}
    >
      <PlayIcon size={c.iconSize} />

      <span className="flex flex-col leading-[1.2]">
        <span
          className={`font-sans font-normal text-[#f0f4ff]/45 ${c.captionSize} tracking-widest uppercase`}
        >
          GET IT ON
        </span>
        <span
          className={`font-display font-bold text-[#f0f4ff] ${c.labelSize} tracking-[-0.01em]`}
        >
          Google Play
        </span>
      </span>
    </motion.a>
  );
}
