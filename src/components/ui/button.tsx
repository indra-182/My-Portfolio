import * as React from "react";

const buttonBase =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-transparent px-4 text-sm font-semibold whitespace-nowrap transition-[background-color,color,border-color,transform] duration-[var(--motion-fast)] outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:shrink-0";

const buttonVariantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/85",
  outline: "border-border bg-background hover:bg-muted hover:text-foreground",
  ghost: "hover:bg-muted hover:text-foreground",
} as const;

const buttonSizeClasses = {
  default: "min-h-11",
  lg: "min-h-12 px-5",
  icon: "size-11 p-0",
} as const;

type ButtonVariant = keyof typeof buttonVariantClasses;
type ButtonSize = keyof typeof buttonSizeClasses;

export function buttonVariants({
  variant = "default",
  size = "default",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
} = {}) {
  return [buttonBase, buttonVariantClasses[variant], buttonSizeClasses[size]].join(" ");
}

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[buttonVariants({ variant, size }), className].filter(Boolean).join(" ")}
    />
  );
}
