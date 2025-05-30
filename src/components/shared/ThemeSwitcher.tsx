import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { applyTheme as applyThemeLib, type Theme } from "@/lib/theme";

type EffectiveTheme = 'light' | 'dark';

export function ThemeSwitcher() {
  // This state primarily helps in knowing what to display if we had more complex logic,
  // but icons are mostly CSS driven by the class on <html>.
  const [effectiveTheme, setEffectiveTheme] = useState<EffectiveTheme>(() => {
    const storedPreference = localStorage.getItem('theme') as Theme | null;
    if (storedPreference === 'light' || storedPreference === 'dark') {
      return storedPreference;
    }
    // For 'system' or null, determine current effective theme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Function to update the local state based on the 'themechange' event
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ theme: EffectiveTheme }>;
      console.log('[ThemeSwitcher] Detected "themechange" event. New effective theme:', customEvent.detail.theme);
      setEffectiveTheme(customEvent.detail.theme);
    };
    
    window.addEventListener('themechange', handleThemeChange);
    
    // Ensure initial state is correct, especially if this component mounts
    // after the initial 'themechange' event from initializeTheme.
    const initialPreference = localStorage.getItem('theme') as Theme | null;
    let currentEffective: EffectiveTheme;
    if (initialPreference === 'light' || initialPreference === 'dark') {
        currentEffective = initialPreference;
    } else { // system or null
        currentEffective = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (effectiveTheme !== currentEffective) {
        setEffectiveTheme(currentEffective);
    }
    console.log('[ThemeSwitcher] Initialized. Current effective theme for icon state:', currentEffective);

    return () => {
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, []); // Rerun on effectiveTheme change might cause loop, so empty dependency array.

  const handleSetThemePreference = (themePreference: Theme) => {
    console.log('[ThemeSwitcher] Dropdown item clicked. Setting preference to:', themePreference);
    applyThemeLib(themePreference); // This will apply, store preference, and dispatch 'themechange'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          {/* Tailwind's dark: variant relies on the 'dark' class on an ancestor (html) */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleSetThemePreference('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetThemePreference('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetThemePreference('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
