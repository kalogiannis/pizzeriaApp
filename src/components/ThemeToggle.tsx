import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const { setTheme, isDark } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle Dark Mode"
      className="rounded-full"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300 transition-transform duration-200 hover:-rotate-12" />
      )}
    </Button>
  );
};