// noinspection JSDeprecatedSymbols

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    // noinspection JSDeprecatedSymbols
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 150, damping: 20, delay: 0.1 } 
    },
  };

  const mikatyPurple = 'hsl(var(--primary))';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="scroll-to-top-button"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed bottom-[calc(1.25rem_+_2.25rem_+_0.75rem)] right-5 z-50"
          whileHover={{ scale: 1.15 }} 
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={scrollToTop}
            className="rounded-full h-9 w-9 p-0 shadow-md flex items-center justify-center"
            style={{ backgroundColor: mikatyPurple }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} className="text-primary-foreground" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;