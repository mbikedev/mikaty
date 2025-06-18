import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MobileMenuToggle = ({ isOpen, onToggle, isHeroVisible }) => {
  const iconVariants = {
    opened: { rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
    closed: { rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
    exitOpen: { rotate: 90, opacity: 0, transition: { duration: 0.2 } },
    exitClosed: { rotate: -90, opacity: 0, transition: { duration: 0.2 } },
  };

  const buttonClass = cn(
    "lg:hidden p-2 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 overflow-hidden",
     isHeroVisible 
      ? "bg-white/10 hover:bg-white/20 text-white border border-white/30" 
      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-transparent"
  );
  
  const iconColorClass = cn(
    isHeroVisible ? "text-white" : "text-foreground"
  );

  return (
    <Button
      variant="ghost"
      size="icon"
      className={buttonClass}
      onClick={onToggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <motion.div
            key="x"
            variants={iconVariants}
            initial="exitOpen"
            animate="opened"
            exit="exitOpen"
          >
            <X size={24} className={iconColorClass} />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            variants={iconVariants}
            initial="exitClosed"
            animate="closed"
            exit="exitClosed"
          >
            <Menu size={24} className={iconColorClass} />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default MobileMenuToggle;