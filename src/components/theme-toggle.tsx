import { LuMoon, LuSun } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { SITE_INTERACTION } from "@/components/site-interaction-contract";

export function ThemeToggle({ label }: { label: string }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      data-site-interaction={SITE_INTERACTION.themeToggle}
      className="site-control"
    >
      <LuSun aria-hidden="true" data-theme-icon="light" className="size-4" />
      <LuMoon aria-hidden="true" data-theme-icon="dark" className="size-4" />
    </Button>
  );
}
