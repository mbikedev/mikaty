import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LanguageSwitcher = ({ language, languageOptions, onLanguageChange, buttonVariants, isHeroVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentLanguage = languageOptions.find(opt => opt.code === language) || languageOptions[0];

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const buttonClass = cn(
    "flex items-center space-x-1.5 md:space-x-2 px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isHeroVisible 
      ? "bg-white/10 hover:bg-white/20 text-white border border-white/30" 
      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-transparent"
  );

  const iconClass = cn(
    "transition-colors duration-300",
    isHeroVisible ? "text-white/90" : "text-secondary-foreground"
  );

  const chevronClass = cn(
    "transition-transform duration-200",
    isOpen ? 'rotate-180' : '',
    isHeroVisible ? "text-white/70" : "text-secondary-foreground/70"
  );


  return (
    <div className="relative" ref={dropdownRef}>
      <motion.div whileHover={buttonVariants.hover} whileTap={buttonVariants.tap}>
        <Button
          variant="ghost"
          size="sm"
          className={buttonClass}
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <Globe size={18} className={iconClass} />
          <span className={cn("font-medium text-sm", iconClass)}>{currentLanguage.label}</span>
          <ChevronDown size={16} className={chevronClass} />
        </Button>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl shadow-2xl bg-popover border border-border/20 p-2 z-50 overflow-hidden"
          >
            {languageOptions.map((option) => (
              <Button
                key={option.code}
                variant="ghost"
                className={`w-full justify-start px-3 py-2.5 text-sm font-medium rounded-lg
                  ${language === option.code 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-popover-foreground hover:bg-muted hover:text-accent-foreground'
                  }
                `}
                onClick={() => {
                  onLanguageChange(option.code);
                  setIsOpen(false);
                }}
              >
                <img-replace src={option.flag} alt={`${option.label} flag`} class="w-5 h-5 mr-2.5 rounded-sm object-cover" />
                {option.fullName}
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;