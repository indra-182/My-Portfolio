import { Button } from "@/components/ui/button";
import { LuMenu, LuX } from "react-icons/lu";

export type MobileNavigationItem = { label: string; href: string; active?: boolean };

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
    <div data-mobile-navigation>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={openLabel}
        aria-haspopup="dialog"
        aria-controls={id}
        data-mobile-navigation-open
        className="md:hidden"
      >
        <LuMenu aria-hidden="true" />
      </Button>
      <dialog
        id={id}
        aria-labelledby={`${id}-title`}
        className="fixed inset-y-0 right-0 m-0 h-full w-[min(22rem,calc(100%-2rem))] max-w-full flex-col gap-4 border-l border-border bg-background p-0 text-sm text-foreground shadow-lg backdrop:bg-black/10 open:flex"
      >
        <div className="flex flex-col gap-0.5 border-b border-border p-4 pb-5">
          <div id={`${id}-title`} className="font-mono text-sm tracking-[0.18em]">
            INDRA.DEV
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={closeLabel}
          title={closeLabel}
          data-mobile-navigation-close
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          <LuX aria-hidden="true" />
        </Button>
        <nav aria-label={navLabel} className="flex flex-col gap-2 px-4 py-3">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className="cursor-pointer border-b border-border/70 text-base font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex min-h-11 items-center">{item.label}</span>
            </a>
          ))}
        </nav>
      </dialog>
    </div>
  );
}
