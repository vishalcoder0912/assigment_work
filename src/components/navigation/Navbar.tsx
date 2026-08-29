import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export const navItems = [
  { label: "Studio", to: "/studio" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-lux",
        scrolled ? "bg-[var(--scrim-nav)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 transition-all duration-700 ease-lux md:px-10 lg:px-16",
          scrolled ? "h-14" : "h-20",
        )}
      >
        <Link to="/" className="flex items-baseline gap-3 text-ivory">
          <span className="text-sm font-medium uppercase tracking-[0.32em]">Bambral</span>
          <span className="label-tech hidden md:inline">3D Studio</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="label-tech link-underline transition-colors duration-500 hover:text-ivory"
              activeProps={{ className: "text-ivory" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="border border-border px-5 py-3 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:border-champagne hover:bg-surface-warm/60"
          >
            Start a Project
          </Link>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-ivory"
          >
            <Menu className="size-5" strokeWidth={1.2} />
          </button>
        </div>
      </div>

      {open ? <MobileMenu onClose={() => setOpen(false)} /> : null}
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grain bg-background lg:hidden">
      <div className="flex h-20 items-center justify-between px-6">
        <span className="text-sm font-medium uppercase tracking-[0.32em] text-ivory">Bambral</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-ivory"
        >
          <X className="size-5" strokeWidth={1.2} />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex flex-col px-6 pt-10">
        {navItems.map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClose}
            className="display hairline-b py-6 text-4xl text-ivory"
          >
            <span className="label-tech mr-4 align-super">0{index + 1}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-6 pt-10">
        <Link
          to="/configurator"
          onClick={onClose}
          className="block border border-border px-6 py-4 text-center text-[0.6875rem] uppercase tracking-[0.2em] text-ivory"
        >
          Design a Ring
        </Link>
      </div>
    </div>
  );
}
