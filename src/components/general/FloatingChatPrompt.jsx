// noinspection JSUnresolvedReference

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare as MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const FloatingChatPrompt = ({ onOpenChat }) => {
  const [isVisible, setIsVisible] = useState(false); 
  const { translations: t } = useLanguage();
  const appearTimeoutRef = useRef(null);

  useEffect(() => {
    appearTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 15000); 

    return () => {
      clearTimeout(appearTimeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    setIsVisible(true); 
    onOpenChat();
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 150, damping: 20, delay: 0.2 }
    },
  };
  
  const mikatyPurple = 'hsl(var(--primary))';

  // noinspection JSUnresolvedReference
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="floating-chat-icon"
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed bottom-5 right-5 z-[9998]"
          whileHover={{ scale: 1.15 }} 
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={handleClick}
            className="rounded-full h-9 w-9 p-0 shadow-md flex items-center justify-center"
            style={{ backgroundColor: mikatyPurple }}
            aria-label={t.openChat || "Open chat"}
          >
            <MessageSquareText size={18} className="text-primary-foreground" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingChatPrompt;