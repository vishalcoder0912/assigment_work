import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16", className)}>
      {children}
    </div>
  );
}

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("label-tech inline-flex items-center gap-3", className)}>
      <span aria-hidden className="h-px w-8 bg-gold/60" />
      {children}
    </span>
  );
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className={cn("display text-ivory text-[clamp(2.4rem,5.6vw,5.2rem)]", className)}>
      {children}
    </Tag>
  );
}

const buttonStyles = cva(
  "group relative inline-flex items-center justify-center gap-3 whitespace-nowrap text-[0.6875rem] font-medium uppercase tracking-[0.2em] transition-all duration-500 ease-lux disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        solid: "bg-champagne px-7 py-4 text-primary-foreground hover:bg-ivory",
        outline:
          "border border-border px-7 py-4 text-ivory hover:border-champagne hover:bg-surface-warm/60",
        ghost: "px-0 py-1 text-muted-foreground hover:text-ivory",
      },
      size: {
        default: "",
        sm: "px-5 py-3",
      },
    },
    defaultVariants: { variant: "outline", size: "default" },
  },
);

type ButtonVariants = VariantProps<typeof buttonStyles>;

export function LuxButton({
  className,
  variant,
  size,
  children,
  ...props
}: ComponentProps<"button"> & ButtonVariants) {
  return (
    <button className={cn(buttonStyles({ variant, size }), className)} {...props}>
      {children}
      <Arrow />
    </button>
  );
}

export function LuxLink({
  className,
  variant,
  size,
  children,
  ...props
}: LinkComponentProps<"a"> & ButtonVariants & { className?: string; children: ReactNode }) {
  return (
    <Link className={cn(buttonStyles({ variant, size }), className)} {...(props as any)}>
      {children}
      <Arrow />
    </Link>
  );
}

function Arrow() {
  return (
    <span
      aria-hidden
      className="inline-block translate-x-0 transition-transform duration-500 ease-lux group-hover:translate-x-1"
    >
      →
    </span>
  );
}

export function Hairline({ className }: { className?: string }) {
  return <div aria-hidden className={cn("h-px w-full bg-hairline", className)} />;
}

export function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-hairline pt-4">
      <dt className="label-tech">{label}</dt>
      <dd className="display mt-2 text-lg text-ivory">{value}</dd>
    </div>
  );
}
