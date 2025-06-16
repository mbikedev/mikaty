import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeToggle = ({ buttonVariants, isHeroVisible }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const buttonClass = cn(
    "p-2 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isHeroVisible 
      ? "bg-white/10 hover:bg-white/20 text-white border border-white/30" 
      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-transparent"
  );

  const iconClass = cn(
    "transition-colors duration-300",
    isHeroVisible ? "text-white/90" : "text-secondary-foreground"
  );

  return (
    <motion.div whileHover={buttonVariants.hover} whileTap={buttonVariants.tap}>
      <Button
        variant="ghost"
        size="icon"
        className={buttonClass}
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
      >
        {theme === 'light' ? (
          <Sun size={20} className={iconClass} />
        ) : (
          <Moon size={20} className={iconClass} />
        )}
      </Button>
    </motion.div>
  );
};

export default ThemeToggle;