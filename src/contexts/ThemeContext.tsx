// import React, { createContext, useContext, useEffect, useState } from 'react';

// type Theme = 'dark' | 'light' | 'system';

// interface ThemeContextType {
//   theme: Theme;
//   setTheme: (theme: Theme) => void;
//   isDark: boolean;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [theme, setTheme] = useState<Theme>(() => {
//     return (localStorage.getItem('theme') as Theme) || 'system';
//   });

//   const [isDark, setIsDark] = useState<boolean>(false);

//   useEffect(() => {
//     const root = document.documentElement;
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

//     const applyTheme = () => {
//       const systemDark = mediaQuery.matches;
//       const shouldBeDark = theme === 'dark' || (theme === 'system' && systemDark);
      
//       setIsDark(shouldBeDark);
//       root.classList.toggle('dark', shouldBeDark);
//     };

//     applyTheme();

//     if (theme === 'system') {
//       localStorage.removeItem('theme');
//       mediaQuery.addEventListener('change', applyTheme);
//       return () => mediaQuery.removeEventListener('change', applyTheme);
//     } else {
//       localStorage.setItem('theme', theme);
//     }
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };































import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext, type Theme } from './theme-context';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const systemDark = mediaQuery.matches;
      const shouldBeDark = theme === 'dark' || (theme === 'system' && systemDark);

      setIsDark(shouldBeDark);
      root.classList.toggle('dark', shouldBeDark);
    };

    applyTheme();

    if (theme === 'system') {
      localStorage.removeItem('theme');
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    } else {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};