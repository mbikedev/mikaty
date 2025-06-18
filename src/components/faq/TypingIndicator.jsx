import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

const TypingIndicator = ({ avatar }) => {
  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -4, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex items-end space-x-2 justify-start">
      {avatar ? (
        <div className="h-8 w-8 self-start">
          {avatar}
        </div>
      ) : (
      <Avatar className="h-8 w-8 self-start">
        <AvatarImage src="https://storage.googleapis.com/hostinger-horizons-assets-prod/d9983a96-d946-4810-b34e-643479ab9517/cb745247e5e0f36007523b452c67a14e.webp" alt="Mikaty Assistant" />
          <AvatarFallback><Bot size={18} /></AvatarFallback>
      </Avatar>
      )}
      <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl rounded-bl-none shadow-md">
        <div className="flex space-x-1">
          <motion.div
            className="w-2 h-2 bg-primary/50 rounded-full"
            variants={dotVariants}
            initial="initial"
            animate="animate"
            style={{ animationDelay: "0s" }}
          />
          <motion.div
            className="w-2 h-2 bg-primary/50 rounded-full"
            variants={dotVariants}
            initial="initial"
            animate="animate"
            style={{ animationDelay: "0.2s" }}
          />
          <motion.div
            className="w-2 h-2 bg-primary/50 rounded-full"
            variants={dotVariants}
            initial="initial"
            animate="animate"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;