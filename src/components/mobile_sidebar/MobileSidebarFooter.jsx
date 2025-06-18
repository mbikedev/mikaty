import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

const MobileSidebarFooter = ({ onClose, onLinkClick, t }) => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const languageOptions = [
    { code: "en", label: "EN", flag: "/us-flag.svg", name: t.languageSwitchToEN || "English" },
    { code: "fr", label: "FR", flag: "/fr-flag.svg", name: t.languageSwitchToFR || "Français" },
  ];

  const ThemeToggleMobile = () => {
    const currentThemeLabel = theme === 'light' ? t.themeLight : (theme === 'dark' ? t.themeDark : t.themeSystem);
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="lg" className="w-full border-purple-300/50 dark:border-purple-800/50 bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 text-white justify-start text-lg pl-3">
            {theme === 'dark' ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
            {currentThemeLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 bg-popover/90 backdrop-blur-sm border-border">
          <DropdownMenuItem onClick={() => { setTheme("light"); onClose(); }} className="text-base hover:bg-muted">
            <Sun className="h-4 w-4 mr-2 opacity-70" /> {t.themeLight || "Light"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setTheme("dark"); onClose(); }} className="text-base hover:bg-muted">
            <Moon className="h-4 w-4 mr-2 opacity-70" /> {t.themeDark || "Dark"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setTheme("system"); onClose(); }} className="text-base hover:bg-muted">
            {/* Using Globe as a generic icon for system theme for now */}
            <Globe className="h-4 w-4 mr-2 opacity-70" /> {t.themeSystem || "System"} 
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const LanguageToggleMobile = () => {
    const currentLang = languageOptions.find(opt => opt.code === language) || languageOptions[0];
    return (
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="w-full border-purple-300/50 dark:border-purple-800/50 bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 text-white justify-start text-lg pl-3">
          <img  
            src={currentLang.flag} 
            alt={currentLang.name + " flag"} 
            className="h-5 w-6 mr-2 rounded-sm" 
          />
          {currentLang.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 bg-popover/90 backdrop-blur-sm border-border">
        {languageOptions.map(opt => (
          <DropdownMenuItem 
            key={opt.code} 
            onClick={() => { setLanguage(opt.code); onClose(); }} 
            className={`text-base hover:bg-muted ${language === opt.code ? 'bg-primary/10 text-primary' : ''}`}
          >
            <img  src={opt.flag} alt={opt.name + " flag"} className="h-5 w-6 mr-2 rounded-sm" />
            {opt.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    );
  };

  return (
    <motion.div 
      className="mt-auto space-y-3 pt-4 border-t border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.3 } }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
    >
      <ThemeToggleMobile />
      <LanguageToggleMobile />
      <Button 
        asChild 
        className="w-full bg-white/90 hover:bg-white text-purple-700 text-lg py-3 font-semibold" 
        onClick={onLinkClick}
      >
        <Link to="/register">{t.navRegister || "Register"}</Link>
      </Button>
    </motion.div>
  );
};

export default MobileSidebarFooter;