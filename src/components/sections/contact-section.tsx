import { LuArrowUpRight, LuDownload, LuMail } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactSection({
  heading,
  description,
  emailLabel,
  email,
  linkedinLabel,
  linkedinUrl,
  cvLabel,
  cvHref,
}: {
  heading: string;
  description: string;
  emailLabel: string;
  email: string;
  linkedinLabel: string;
  linkedinUrl: string;
  cvLabel: string;
  cvHref: string;
}) {
  return (
    <section id="contact" className="cue-section cue-contact" aria-labelledby="contact-title">
      <div className="content-shell">
        <div className="contact-grid">
          <div>
            <h2 id="contact-title">{heading}</h2>
            <p className="contact-description">{description}</p>
            <div className="contact-actions">
              <a
                href={`mailto:${email}`}
                className={cn(buttonVariants({ size: "lg" }), "cue-button")}
              >
                <LuMail aria-hidden="true" className="size-4" />
                {emailLabel}
                <LuArrowUpRight aria-hidden="true" className="size-4" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "cue-button")}
              >
                {linkedinLabel}
                <LuArrowUpRight aria-hidden="true" className="size-4" />
              </a>
              <a
                href={cvHref}
                download
                className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "cue-button")}
              >
                <LuDownload aria-hidden="true" className="size-4" />
                {cvLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
