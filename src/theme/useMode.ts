import { useEffect, useState } from 'react';

export const Mode = {
    LIGHT: 'light',
    DARK: 'dark',
}

export function useThemeMode() {
  const [theme, setTheme] = useState(Mode.LIGHT);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(prefers-color-scheme: ${Mode.DARK})`);
    setTheme(mediaQuery.matches ? Mode.DARK : Mode.LIGHT);
    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? Mode.DARK : Mode.LIGHT);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return theme;
}
