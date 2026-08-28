import * as React from "react";

const badgeBase =
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors duration-[var(--motion-fast)] [&>svg]:pointer-events-none [&>svg]:size-3";

const badgeVariantClasses = {
  default: "border-transparent bg-primary text-primary-foreground",
  outline: "border-border text-foreground",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  ghost: "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
} as const;

type BadgeVariant = keyof typeof badgeVariantClasses;

export function badgeVariants({ variant }: { variant?: BadgeVariant | null } = {}) {
  return [badgeBase, variant === null ? "" : badgeVariantClasses[variant ?? "default"]]
    .filter(Boolean)
    .join(" ");
}

export type BadgeProps = React.ComponentProps<"span"> & {
  variant?: BadgeVariant | null;
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      {...props}
      data-slot="badge"
      className={[badgeVariants({ variant }), className].filter(Boolean).join(" ")}
    />
  );
}
