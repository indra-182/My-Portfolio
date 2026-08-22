import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggle({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      data-theme-toggle
      className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md border border-transparent text-muted-foreground transition-[background-color,color,transform] duration-[var(--motion-fast)] hover:-translate-y-0.5 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] active:translate-y-0"
    >
      <LuSun aria-hidden="true" data-theme-icon="light" className="size-4" />
      <LuMoon aria-hidden="true" data-theme-icon="dark" className="size-4" />
    </button>
  );
}
