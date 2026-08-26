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
    <footer className="site-footer">
      <div className="content-shell">
        <div className="site-footer-main">
          <div>
            <a href={`/${locale}`} className="site-wordmark">
              INDRA<span>.</span>DEV
            </a>
            <p className="site-footer-description">{labels.description}</p>
          </div>
          <nav aria-label={labels.navigationLabel} className="site-footer-links">
            <a
              href={blogUrl}
              aria-label={labels.blog}
              title={labels.blog}
              className="site-footer-link"
            >
              <LuFileText aria-hidden="true" />
              <span>{labels.blog}</span>
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={labels.github}
              title={labels.github}
              className="site-footer-link"
            >
              <FaGithub aria-hidden="true" />
              <span>{labels.github}</span>
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={labels.linkedin}
              title={labels.linkedin}
              className="site-footer-link"
            >
              <FaLinkedin aria-hidden="true" />
              <span>{labels.linkedin}</span>
            </a>
            <a
              href={`mailto:${email}`}
              aria-label={labels.email}
              title={labels.email}
              className="site-footer-link"
            >
              <LuMail aria-hidden="true" />
              <span>{labels.email}</span>
            </a>
          </nav>
        </div>
        <div className="site-footer-meta">
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
