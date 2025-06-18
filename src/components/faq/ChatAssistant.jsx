// noinspection ES6UnusedImports

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// noinspection ES6UnusedImports
import { Bot, Send, UserCircle2, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatBubble from '@/components/faq/ChatBubble';
import TypingIndicator from '@/components/faq/TypingIndicator';
import SuggestedQuestion from '@/components/faq/SuggestedQuestion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ChatAssistant = () => {
  const { language, setLanguage, translations: t } = useLanguage();
  const [messages, setMessages] = useState([]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatWindowRef = useRef(null);

  const [mikatyResponses, setMikatyResponses] = useState({});
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [questionKeys, setQuestionKeys] = useState({});
  const mikatyLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/d9983a96-d946-4810-b34e-643479ab9517/27480bf68226b8b04161adf7e3352002.webp";

  useEffect(() => {
    setMessages([
      {
        id: 'initial',
        text: t.chatAssistantWelcome,
        sender: 'ai',
        avatar: (
          <Avatar className="h-8 w-8 self-start">
            <AvatarImage src={mikatyLogoUrl} alt="Mikaty Assistant Logo" />
            <AvatarFallback><Bot size={18} /></AvatarFallback>
          </Avatar>
        ),
      },
    ]);

    const currentQuestionKeys = {
      q1: 'chatSuggestion1',
      q2: 'chatSuggestion2',
      q3: 'chatSuggestion3',
    };
    setQuestionKeys(currentQuestionKeys);

    setSuggestedQuestions([
      t[currentQuestionKeys.q1],
      t[currentQuestionKeys.q2],
      t[currentQuestionKeys.q3],
    ]);
    
    setMikatyResponses({
      [currentQuestionKeys.q1]: t.chatResponse1,
      [currentQuestionKeys.q2]: t.chatResponse2,
      [currentQuestionKeys.q3]: t.chatResponse3,
      "default": t.chatFallbackPreLink
    });

  }, [t, mikatyLogoUrl]);


  const handleSendMessage = (text, key) => {
    if (text.trim() === '') return;

    const newUserMessage = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText;
      let isFallback = true;

      if (key && mikatyResponses[key]) {
        aiResponseText = mikatyResponses[key];
        isFallback = false;
      } else {
         const lowerCaseText = text.toLowerCase();
         const directMatchKey = Object.keys(questionKeys).find(
           qKey => (t[questionKeys[qKey]] || "").toLowerCase() === lowerCaseText
         );
         if (directMatchKey && mikatyResponses[questionKeys[directMatchKey]]) {
           aiResponseText = mikatyResponses[questionKeys[directMatchKey]];
           isFallback = false;
         } else {
           aiResponseText = mikatyResponses["default"];
         }
      }
      
      const newAiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        avatar: (
          <Avatar className="h-8 w-8 self-start">
            <AvatarImage src={mikatyLogoUrl} alt="Mikaty Assistant Logo" />
            <AvatarFallback><Bot size={18} /></AvatarFallback>
          </Avatar>
        ),
        isFallback: isFallback,
        fallbackLinkText: isFallback ? t.chatFallbackLinkText : undefined,
        fallbackLinkPath: isFallback ? "/contact" : undefined,
        fallbackPostLink: isFallback ? t.chatFallbackPostLink : undefined,
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleSuggestedQuestionClick = (questionText, questionKey) => {
    handleSendMessage(questionText, questionKey);
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const languageOptions = [
    { code: 'en', label: 'EN', fullName: 'English', flag: '/us-flag.svg' },
    { code: 'fr', label: 'FR', fullName: 'Français', flag: '/fr-flag.svg' },
  ];

  const currentLanguageOption = languageOptions.find(opt => opt.code === language);

  if (Object.keys(mikatyResponses).length === 0) {
    return null; 
  }

  return (
    <div className="max-w-2xl mx-auto bg-card dark:bg-card/80 shadow-2xl rounded-xl overflow-hidden border border-border/50">
      <div className="p-4 md:p-6 border-b border-border/50 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border-2 border-primary/50">
            <AvatarImage src={mikatyLogoUrl} alt="Mikaty Assistant Logo" />
            <AvatarFallback><Bot className="text-primary" /></AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{t.chatAssistantTitle}</h3>
            <p className="text-sm text-muted-foreground">{t.chatAssistantOnline}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="p-2 h-9">
              <Globe size={16} className="mr-1.5" />
              {currentLanguageOption?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover border-border shadow-lg w-36">
            {languageOptions.map(opt => (
              <DropdownMenuItem
                key={opt.code}
                onClick={() => setLanguage(opt.code)}
                className={`flex items-center px-3 py-2 text-sm cursor-pointer transition-colors
                  ${language === opt.code ? 'bg-primary/10 text-primary font-medium' : 'text-popover-foreground hover:bg-muted'}`
                }
              >
                <img src={opt.flag} alt={`${opt.label} flag`} className="w-4 h-auto mr-2 rounded-sm" />
                <span>{opt.fullName}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        ref={chatWindowRef}
        className="h-96 overflow-y-auto p-4 md:p-6 space-y-4 bg-background/30 dark:bg-background/50"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ChatBubble
                id={msg.id}
                text={msg.text}
                sender={msg.sender}
                avatar={msg.avatar} 
                isFallback={msg.isFallback}
                fallbackLinkText={msg.fallbackLinkText}
                fallbackLinkPath={msg.fallbackLinkPath}
                fallbackPostLink={msg.fallbackPostLink}
                mikatyLogoUrl={mikatyLogoUrl}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && <TypingIndicator avatar={
            <Avatar className="h-8 w-8 self-start">
                <AvatarImage src={mikatyLogoUrl} alt="Mikaty Assistant Typing" />
                <AvatarFallback><Bot size={18} /></AvatarFallback>
            </Avatar>
        } />}
      </div>

      <div className="p-4 md:p-6 border-t border-border/50 bg-card dark:bg-card/80">
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestedQuestions.map((q, index) => (
            <SuggestedQuestion
              key={index}
              question={q}
              onClick={() => handleSuggestedQuestionClick(q, Object.keys(questionKeys)[index])}
            />
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex items-center space-x-2"
        >
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t.chatPlaceholder}
            className="flex-grow bg-input dark:bg-input/70 focus:ring-primary/50"
            aria-label="Chat input"
          />
          <Button type="submit" size="icon" className="gradient-button" disabled={isTyping || inputValue.trim() === ''}>
            <Send size={20} />
            <span className="sr-only">{t.chatSendButton}</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatAssistant;