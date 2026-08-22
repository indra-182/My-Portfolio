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
      <button
        type="button"
        aria-label={openLabel}
        aria-haspopup="dialog"
        aria-controls={id}
        data-mobile-navigation-open
        className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] md:hidden"
      >
        <LuMenu aria-hidden="true" />
      </button>
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
        <button
          type="button"
          aria-label={closeLabel}
          title={closeLabel}
          data-mobile-navigation-close
          className="absolute top-3 right-3 inline-flex size-11 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
        >
          <LuX aria-hidden="true" />
        </button>
        <nav aria-label={navLabel} className="flex flex-col gap-2 px-4 py-3">
          {items.map((item) => (
            <a key={item.href} href={item.href} aria-current={item.active ? "page" : undefined}>
              <span className="flex min-h-11 items-center border-b border-border/70 text-base font-medium">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </dialog>
    </div>
  );
}
