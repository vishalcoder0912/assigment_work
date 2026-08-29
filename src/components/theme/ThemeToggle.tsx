import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={cn(
        "group relative inline-flex min-h-11 min-w-11 items-center justify-center border border-border text-ivory transition-colors duration-500 hover:border-champagne",
        className,
      )}
    >
      <span className="relative block size-4">
        <Sun
          className={cn(
            "absolute inset-0 size-4 transition-all duration-700 ease-lux",
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
          )}
          strokeWidth={1.2}
        />
        <Moon
          className={cn(
            "absolute inset-0 size-4 transition-all duration-700 ease-lux",
            isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
          )}
          strokeWidth={1.2}
        />
      </span>
    </button>
  );
}
