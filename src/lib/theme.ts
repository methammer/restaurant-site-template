export type Theme = 'light' | 'dark' | 'system';

// Applies the theme to the document, stores the preference, and dispatches an event
export function applyTheme(themePreference: Theme) {
  console.log(`[theme.ts] applyTheme called with preference: ${themePreference}`);
  let effectiveTheme: 'light' | 'dark';

  if (themePreference === 'system') {
    effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    console.log(`[theme.ts] System preference resolved to effective theme: ${effectiveTheme}`);
  } else {
    effectiveTheme = themePreference;
  }

  // Remove previous theme classes and add the new effective theme class
  document.documentElement.classList.remove('light', 'dark');
  if (effectiveTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    // Assuming 'light' is the default or you have specific .light styles
    document.documentElement.classList.add('light'); 
  }
  console.log(`[theme.ts] Set html class to: ${effectiveTheme} (classes: ${document.documentElement.className})`);
  
  // Store the user's explicit preference ('light', 'dark', or 'system')
  localStorage.setItem('theme', themePreference);
  console.log(`[theme.ts] localStorage 'theme' preference set to: ${themePreference}`);

  // Dispatch a custom event with the *effective* theme that was applied
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: effectiveTheme } }));
  console.log(`[theme.ts] Dispatched 'themechange' event with effective theme: ${effectiveTheme}`);
}

// Initializes theme from localStorage or system settings
export function initializeTheme() {
  const storedPreference = localStorage.getItem('theme') as Theme | null;
  console.log(`[theme.ts] initializeTheme: storedPreference=${storedPreference}`);
  // If no preference is stored, default to 'system'.
  // applyTheme will then resolve 'system' to 'light' or 'dark' for the class
  // and store 'system' in localStorage as the initial preference.
  applyTheme(storedPreference || 'system'); 
}

// Toggles between light and dark mode, updates preference to 'light' or 'dark'
// This function is not directly used by the DropdownMenu version of ThemeSwitcher,
// but kept for potential other uses or a simpler toggle button.
export function toggleTheme(): 'light' | 'dark' {
  const currentPreference = localStorage.getItem('theme') as Theme | null;
  let currentEffectiveTheme: 'light' | 'dark';

  if (currentPreference === 'system' || !currentPreference) {
    currentEffectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } else {
    // If preference is 'light' or 'dark', that's our current effective theme
    currentEffectiveTheme = currentPreference; 
  }
  
  const newExplicitTheme: 'light' | 'dark' = currentEffectiveTheme === 'light' ? 'dark' : 'light';
  console.log(`[theme.ts] toggleTheme: currentEffectiveTheme=${currentEffectiveTheme}, new explicit theme to apply=${newExplicitTheme}`);
  applyTheme(newExplicitTheme); // This will store 'light' or 'dark' in localStorage and apply it
  return newExplicitTheme; // Return the new explicit theme preference
}

// Listens to OS preference changes and re-applies theme if 'system' is the current preference
export function listenToOSPreferenceChanges(onSystemPreferenceChangeCallback: () => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = () => {
    const storedPreference = localStorage.getItem('theme') as Theme | null;
    console.log('[theme.ts] OS preference changed via media query. Current stored preference:', storedPreference);
    // Only re-apply if the user's preference is 'system' or not set (defaults to system)
    if (storedPreference === 'system' || !storedPreference) {
      console.log('[theme.ts] OS change detected and preference is "system". Re-applying system theme.');
      applyTheme('system'); // This will re-evaluate OS pref, apply class, and dispatch 'themechange'
      onSystemPreferenceChangeCallback(); // Call the callback passed from App.tsx
    }
  };

  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}
