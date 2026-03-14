import { Link } from "react-router-dom";
import { APP_NAME } from "../../constants";

type Size = "sm" | "md" | "lg";

const CONF: Record<
  Size,
  {
    box: string;
    icon: number;
    text: string;
    radius: string;
    gap: string;
    glow: string;
  }
> = {
  sm: {
    box: "w-7 h-7",
    icon: 17,
    text: "text-[15px]",
    radius: "rounded-[8px]",
    gap: "gap-2",
    glow: "0 0 10px rgba(59,130,246,0.28), 0 0 1px rgba(59,130,246,0.4)",
  },
  md: {
    box: "w-[34px] h-[34px]",
    icon: 21,
    text: "text-[18px]",
    radius: "rounded-[10px]",
    gap: "gap-2.5",
    glow: "0 0 14px rgba(59,130,246,0.35), 0 0 1px rgba(59,130,246,0.5)",
  },
  lg: {
    box: "w-[46px] h-[46px]",
    icon: 28,
    text: "text-2xl",
    radius: "rounded-[13px]",
    gap: "gap-3",
    glow: "0 0 20px rgba(59,130,246,0.4), 0 0 2px rgba(59,130,246,0.6)",
  },
};

interface LogoProps {
  size?: Size;
  iconOnly?: boolean;
  noLink?: boolean;
}

function LogoInner({
  size = "md",
  iconOnly = false,
}: {
  size: Size;
  iconOnly: boolean;
}) {
  const { box, icon, text, radius, gap } = CONF[size];

  return (
    <span className={`inline-flex items-center ${gap} no-underline`}>
      <span
        className={`flex items-center justify-center ${box} ${radius} shrink-0`}
      >
        <img
          src="/logo.png"
          alt={APP_NAME}
          width={icon}
          height={icon}
          className="object-contain block"
          onError={(e) => {
            const img = e.currentTarget;
            img.style.display = "none";
            const fallback = document.createElement("span");
            fallback.textContent = APP_NAME[0];
            fallback.style.cssText = [
              "color:#fff",
              "font-weight:800",
              `font-size:${Math.round(icon * 0.68)}px`,
              "font-family:'Bricolage Grotesque',sans-serif",
              "line-height:1",
            ].join(";");
            img.parentElement?.appendChild(fallback);
          }}
        />
      </span>

      {!iconOnly && (
        <span
          className={`font-display font-extrabold ${text} text-[#f0f4ff] tracking-[-0.028em] leading-none select-none`}
        >
          {APP_NAME}
        </span>
      )}
    </span>
  );
}

export function Logo({
  size = "md",
  iconOnly = false,
  noLink = false,
}: LogoProps) {
  if (noLink) {
    return <LogoInner size={size} iconOnly={iconOnly} />;
  }

  return (
    <Link
      to="/"
      className="inline-flex items-center no-underline"
      aria-label={APP_NAME}
    >
      <LogoInner size={size} iconOnly={iconOnly} />
    </Link>
  );
}
