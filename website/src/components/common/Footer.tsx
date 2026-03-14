import { Link } from "react-router-dom";
import { Github, Globe, ArrowUpRight } from "lucide-react";
import {
  APP_NAME,
  APP_TAGLINE,
  DEVELOPER,
  LICENSE,
  FOOTER_APP_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_PROJECT_LINKS,
  GITHUB_URL,
  WEBSITE_URL,
} from "../../constants";
import { Logo } from "./Logo";

const cols = [
  { title: "Navigate", links: FOOTER_APP_LINKS },
  {
    title: "Legal",
    links: FOOTER_LEGAL_LINKS.map((l) => ({
      label: l.label,
      href: l.to,
      ext: false,
    })),
  },
  { title: "Project", links: FOOTER_PROJECT_LINKS },
];

const socialLinks = [
  { icon: Github, href: GITHUB_URL, title: "GitHub" },
  { icon: Globe, href: WEBSITE_URL, title: "Website" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050608] border-t border-white/5">
      <div className="max-w-300 mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          <div className="md:col-span-1">
            <div className="mb-4">
              <Logo size="md" />
            </div>
            <p className="text-[13px] text-[#8b95ae] leading-[1.72] max-w-57.5 mb-5 font-sans">
              {APP_TAGLINE}
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, title }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  className="
                    w-8.5 h-8.5 rounded-lg border border-white/8
                    flex items-center justify-center text-[#8b95ae] no-underline
                    transition-all duration-200
                    hover:text-[#f0f4ff] hover:border-blue-500/35 hover:bg-blue-500/8
                  "
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-3 gap-8">
            {cols.map((col) => (
              <div key={col.title}>
                <p className="text-[10.5px] font-semibold tracking-widest uppercase text-[#3d4560] mb-4 font-sans">
                  {col.title}
                </p>
                <ul className="list-none flex flex-col gap-2.5">
                  {col.links.map((l) => {
                    const isExt = l.ext ?? false;
                    const href = l.href ?? "#";
                    return (
                      <li key={l.label}>
                        {isExt ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[13px] text-[#8b95ae] no-underline transition-colors duration-150 hover:text-[#f0f4ff] font-sans"
                          >
                            {l.label}
                            <ArrowUpRight size={10} />
                          </a>
                        ) : (
                          <Link
                            to={href}
                            className="text-[13px] text-[#8b95ae] no-underline transition-colors duration-150 hover:text-[#f0f4ff] font-sans"
                          >
                            {l.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 pt-5.5 flex flex-wrap justify-between items-center gap-2">
          <p className="text-xs text-[#3d4560] font-sans">
            © {new Date().getFullYear()} {APP_NAME} · {DEVELOPER} · {LICENSE}{" "}
            License
          </p>
          <p className="text-xs text-[#3d4560] italic font-sans">
            Built to make every screen readable for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}
