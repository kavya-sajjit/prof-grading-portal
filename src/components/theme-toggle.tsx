"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by waiting until mounted on client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-border/50 bg-muted/40 animate-pulse" />
    );
  }

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-lg border border-border bg-card/60 backdrop-blur-xs text-xs font-medium">
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Light theme"
        className={`p-1.5 rounded-md transition-all ${
          theme === "light"
            ? "bg-primary text-primary-foreground shadow-2xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Dark theme"
        className={`p-1.5 rounded-md transition-all ${
          theme === "dark"
            ? "bg-primary text-primary-foreground shadow-2xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-label="System theme"
        className={`p-1.5 rounded-md transition-all ${
          theme === "system"
            ? "bg-primary text-primary-foreground shadow-2xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Laptop className="h-4 w-4" />
      </button>
    </div>
  );
}
