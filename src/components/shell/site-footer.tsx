import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LuFileText, LuMail } from "react-icons/lu";
import type { PortfolioContent } from "@/content/portfolio-schema";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function SiteFooter({
  locale,
  blogUrl,
  githubUrl,
  email,
  linkedinUrl,
  identity,
  copy,
}: {
  locale: Locale;
  blogUrl: string;
  githubUrl: string;
  email: string;
  linkedinUrl: string;
  identity: Pick<PortfolioContent["profile"], "name" | "location">;
  copy: Dictionary["footer"];
}) {
  const year = new Date().getFullYear();
  const links = [
    { href: blogUrl, label: copy.blog, icon: LuFileText, external: false },
    { href: githubUrl, label: copy.github, icon: FaGithub, external: true },
    { href: linkedinUrl, label: copy.linkedin, icon: FaLinkedin, external: true },
    { href: `mailto:${email}`, label: copy.email, icon: LuMail, external: false },
  ];

  return (
    <footer className="border-t border-border bg-surface pt-14 pb-5">
      <div className="content-shell">
        <div className="flex flex-col gap-8 border-b border-border pb-8 md:flex-row md:items-start md:justify-between">
          <div>
            <a href={`/${locale}`} className="site-wordmark">
              INDRA<span>.</span>DEV
            </a>
            <p className="mt-4 max-w-md text-[0.9rem] leading-[1.6] text-muted-foreground">
              {copy.description}
            </p>
          </div>
          <nav
            aria-label={copy.navigationLabel}
            className="grid grid-cols-[repeat(2,minmax(0,max-content))] gap-x-4 gap-y-[0.65rem] md:flex md:items-center"
          >
            {links.map(({ href, label, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                aria-label={label}
                title={label}
                className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.65rem] tracking-[0.06em] text-muted-foreground no-underline uppercase hover:text-foreground focus-visible:text-foreground"
              >
                <Icon aria-hidden="true" className="size-4 text-[var(--cue-rose)]" />
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 pt-4 font-mono text-[0.62rem] tracking-[0.04em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {identity.name}. {copy.rights}
          </p>
          <span>
            {identity.location.locality}/{identity.location.countryName}
          </span>
        </div>
      </div>
    </footer>
  );
}
