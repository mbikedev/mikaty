import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCircle2, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ChatBubble = ({ id, text, sender, avatar, isFallback, fallbackLinkText, fallbackLinkPath, fallbackPostLink, mikatyLogoUrl }) => {
  const isAI = sender === 'ai';
  const isInitialMessage = id === 'initial';
  const [animatedText, setAnimatedText] = useState('');

  useEffect(() => {
    if (isAI && isInitialMessage && text) {
      setAnimatedText(''); 
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setAnimatedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50); 
      return () => clearInterval(typingInterval);
    } else {
      setAnimatedText(text || ''); 
    }
  }, [text, isAI, isInitialMessage]);

  const textToDisplay = (isAI && isInitialMessage) ? animatedText : (text || '');

  const renderAvatar = () => {
    if (isAI) {
      if (React.isValidElement(avatar)) { 
        return avatar;
      }
      return (
        <Avatar className="h-8 w-8 self-start">
          <AvatarImage src={mikatyLogoUrl} alt="Mikaty Assistant Logo" />
          <AvatarFallback><Bot size={18} /></AvatarFallback>
        </Avatar>
      );
    }
    return (
      <Avatar className="h-8 w-8 self-start">
        <AvatarFallback><UserCircle2 size={18} /></AvatarFallback>
      </Avatar>
    );
  };


  return (
    <div className={cn('flex items-end space-x-2', isAI ? 'justify-start' : 'justify-end')}>
      {isAI && renderAvatar()}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: (isAI && isInitialMessage) ? 0.5 : 0 }}
        className={cn(
          'max-w-[70%] p-3 rounded-xl shadow-md',
          isAI && !isInitialMessage && 'bg-primary/10 text-slate-700 dark:bg-primary/20 dark:text-slate-200 rounded-bl-none',
          isAI && isInitialMessage && 'bg-[#f0f4ff] text-slate-700 dark:bg-blue-900/40 dark:text-slate-200 rounded-bl-none',
          !isAI && 'bg-muted text-muted-foreground dark:bg-muted/70 dark:text-foreground rounded-br-none'
        )}
      >
        {isFallback ? (
          <p className="text-sm">
            {textToDisplay}
            <Link to={fallbackLinkPath || "/contact"} className="text-primary underline hover:text-primary/80 font-semibold mx-1">
              {fallbackLinkText}
            </Link>
            {fallbackPostLink}
          </p>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{textToDisplay}</p>
        )}
      </motion.div>
      {!isAI && renderAvatar()}
    </div>
  );
};

export default ChatBubble;