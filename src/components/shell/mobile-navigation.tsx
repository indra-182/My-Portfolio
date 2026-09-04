import { LuMenu, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { SITE_INTERACTION } from "@/components/shell/site-interaction-contract";

type MobileNavigationItem = { label: string; href: string };

export function MobileNavigation({
  items,
  id,
  description,
  navLabel,
  openLabel,
  closeLabel,
}: {
  items: MobileNavigationItem[];
  id: string;
  description: string;
  navLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  return (
    <div data-site-interaction={SITE_INTERACTION.mobileNavigation}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={openLabel}
        aria-haspopup="dialog"
        aria-controls={id}
        aria-expanded="false"
        data-site-interaction={SITE_INTERACTION.mobileNavigationOpen}
        className="md:hidden"
      >
        <LuMenu aria-hidden="true" />
      </Button>
      <dialog
        id={id}
        aria-labelledby={`${id}-title`}
        className="mobile-navigation-dialog fixed inset-y-0 right-0 left-auto m-0 hidden h-full w-[min(23rem,calc(100%-1rem))] max-w-full flex-col gap-6 overscroll-contain border-0 border-l border-border bg-[var(--popover)] p-5 text-foreground"
      >
        <div className="grid gap-[0.65rem] border-b border-border pb-5">
          <div id={`${id}-title`} className="site-wordmark">
            INDRA<span>.</span>DEV
          </div>
          <p className="text-[0.85rem] leading-normal text-muted-foreground">{description}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={closeLabel}
          title={closeLabel}
          data-site-interaction={SITE_INTERACTION.mobileNavigationClose}
          className="absolute top-4 right-4"
        >
          <LuX aria-hidden="true" />
        </Button>
        <nav aria-label={navLabel} className="flex flex-col">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="min-h-14 border-b border-border py-4 text-[1.1rem] font-bold text-foreground no-underline hover:text-[var(--cue-rose)] focus-visible:text-[var(--cue-rose)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </dialog>
    </div>
  );
}
