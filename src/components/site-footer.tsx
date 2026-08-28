import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LuFileText, LuMail } from "react-icons/lu";
import type { PortfolioContent } from "@/content/portfolio-schema";
import type { Locale } from "@/i18n/config";

export type SiteFooterLabels = {
  navigationLabel: string;
  description: string;
  blog: string;
  github: string;
  linkedin: string;
  email: string;
  rights: string;
};

export function SiteFooter({
  locale,
  blogUrl,
  githubUrl,
  email,
  linkedinUrl,
  identity,
  labels,
}: {
  locale: Locale;
  blogUrl: string;
  githubUrl: string;
  email: string;
  linkedinUrl: string;
  identity: Pick<PortfolioContent["profile"], "name" | "location">;
  labels: SiteFooterLabels;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface pt-14 pb-5">
      <div className="content-shell">
        <div className="flex flex-col gap-8 border-b border-border pb-8 md:flex-row md:items-start md:justify-between">
          <div>
            <a href={`/${locale}`} className="site-wordmark">
              INDRA<span>.</span>DEV
            </a>
            <p className="mt-4 max-w-md text-[0.9rem] leading-[1.6] text-muted-foreground">
              {labels.description}
            </p>
          </div>
          <nav
            aria-label={labels.navigationLabel}
            className="grid grid-cols-[repeat(2,minmax(0,max-content))] gap-x-4 gap-y-[0.65rem] md:flex md:items-center"
          >
            <a
              href={blogUrl}
              aria-label={labels.blog}
              title={labels.blog}
              className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.65rem] tracking-[0.06em] text-muted-foreground no-underline uppercase hover:text-foreground focus-visible:text-foreground"
            >
              <LuFileText aria-hidden="true" className="size-4 text-[var(--cue-rose)]" />
              <span>{labels.blog}</span>
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={labels.github}
              title={labels.github}
              className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.65rem] tracking-[0.06em] text-muted-foreground no-underline uppercase hover:text-foreground focus-visible:text-foreground"
            >
              <FaGithub aria-hidden="true" className="size-4 text-[var(--cue-rose)]" />
              <span>{labels.github}</span>
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={labels.linkedin}
              title={labels.linkedin}
              className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.65rem] tracking-[0.06em] text-muted-foreground no-underline uppercase hover:text-foreground focus-visible:text-foreground"
            >
              <FaLinkedin aria-hidden="true" className="size-4 text-[var(--cue-rose)]" />
              <span>{labels.linkedin}</span>
            </a>
            <a
              href={`mailto:${email}`}
              aria-label={labels.email}
              title={labels.email}
              className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.65rem] tracking-[0.06em] text-muted-foreground no-underline uppercase hover:text-foreground focus-visible:text-foreground"
            >
              <LuMail aria-hidden="true" className="size-4 text-[var(--cue-rose)]" />
              <span>{labels.email}</span>
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-2 pt-4 font-mono text-[0.62rem] tracking-[0.04em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {identity.name}. {labels.rights}
          </p>
          <span>
            {identity.location.locality}/{identity.location.countryName}
          </span>
        </div>
      </div>
    </footer>
  );
}
