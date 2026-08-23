import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LuFileText, LuMail } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
export type SiteFooterLabels = {
  navigationLabel: string;
  description: string;
  blog: string;
  github: string;
  linkedin: string;
  email: string;
  location: string;
  rights: string;
};

export function SiteFooter({
  locale,
  blogUrl,
  githubUrl,
  email,
  linkedinUrl,
  labels,
}: {
  locale: Locale;
  blogUrl: string;
  githubUrl: string;
  email: string;
  linkedinUrl: string;
  labels: SiteFooterLabels;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border sm:mt-24">
      <div className="content-shell py-10 sm:py-12">
        <div className="flex flex-col gap-8 border-b border-border pb-8 md:flex-row md:items-start md:justify-between">
          <div>
            <a
              href={`/${locale}`}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-none px-0 font-mono text-sm font-bold tracking-[0.2em]",
              )}
            >
              INDRA.DEV
            </a>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
              {labels.description}
            </p>
          </div>
          <nav aria-label={labels.navigationLabel} className="flex items-center gap-1">
            <a
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              href={blogUrl}
              aria-label={labels.blog}
              title={labels.blog}
            >
              <LuFileText className="size-5" aria-hidden="true" />
            </a>
            <a
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={labels.github}
              title={labels.github}
            >
              <FaGithub className="size-5" />
            </a>
            <a
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={labels.linkedin}
              title={labels.linkedin}
            >
              <FaLinkedin className="size-5" />
            </a>
            <a
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              href={`mailto:${email}`}
              aria-label={labels.email}
              title={labels.email}
            >
              <LuMail className="size-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-4 pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Mahadi Indra Manurung. {labels.rights}
          </p>
          <span>{labels.location}</span>
        </div>
      </div>
    </footer>
  );
}
