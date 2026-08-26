import { LuMenu, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { SITE_INTERACTION } from "@/components/site-interaction-contract";

export type MobileNavigationItem = { label: string; href: string };

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
    <div data-site-interaction={SITE_INTERACTION.mobileNavigation} className="mobile-navigation">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={openLabel}
        aria-haspopup="dialog"
        aria-controls={id}
        data-site-interaction={SITE_INTERACTION.mobileNavigationOpen}
        className="mobile-navigation-open md:hidden"
      >
        <LuMenu aria-hidden="true" />
      </Button>
      <dialog id={id} aria-labelledby={`${id}-title`} className="mobile-navigation-dialog">
        <div className="mobile-navigation-heading">
          <div id={`${id}-title`} className="site-wordmark">
            INDRA<span>.</span>DEV
          </div>
          <p>{description}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={closeLabel}
          title={closeLabel}
          data-site-interaction={SITE_INTERACTION.mobileNavigationClose}
          className="mobile-navigation-close"
        >
          <LuX aria-hidden="true" />
        </Button>
        <nav aria-label={navLabel} className="mobile-navigation-links">
          {items.map((item) => (
            <a key={item.href} href={item.href}>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </dialog>
    </div>
  );
}
