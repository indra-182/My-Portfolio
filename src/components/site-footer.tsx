import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LuFileText, LuMail } from "react-icons/lu";
import type { SharedSiteProps } from "./site-header";

export function SiteFooter({
  locale,
  blogUrl,
  email = "mahadiindra2@gmail.com",
  linkedinUrl = "https://www.linkedin.com/in/mahadiindra182/",
}: SharedSiteProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border">
      <div className="content-shell py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href={`/${locale}`} className="font-mono text-sm font-bold tracking-[0.2em]">
              INDRA.DEV
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
              Senior Frontend Engineer building clear, dependable product experiences.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex items-center gap-6">
            <Link
              className="transition-colors hover:text-accent"
              href={`${blogUrl}/blog`}
              aria-label="Blog"
              title="Blog"
            >
              <LuFileText className="size-5" aria-hidden="true" />
            </Link>
            <a
              className="transition-colors hover:text-accent"
              href="https://github.com/indra-182"
              target="_blank"
              rel="noreferrer"
              aria-label="Github"
              title="Github"
            >
              <FaGithub className="size-5" />
            </a>
            <a
              className="transition-colors hover:text-accent"
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedin className="size-5" />
            </a>
            <a
              className="transition-colors hover:text-accent"
              href={`mailto:${email}`}
              aria-label="Email"
              title="Email"
            >
              <LuMail className="size-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Mahadi Indra Manurung</p>
          <span>Bogor/Indonesia</span>
        </div>
      </div>
    </footer>
  );
}
