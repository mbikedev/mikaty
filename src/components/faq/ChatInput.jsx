import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ChatInput = ({ value, onChange, onSubmit, disabled }) => {
  const { translations: t } = useLanguage();

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center space-x-2"
    >
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={t.chatPlaceholder || "Ask me anything about Mikaty…"}
        className="flex-grow bg-input dark:bg-input/70 focus:ring-primary/50"
        aria-label="Chat input"
        disabled={disabled}
      />
      <Button type="submit" size="icon" className="gradient-button" disabled={disabled || value.trim() === ''}>
        <Send size={20} />
        <span className="sr-only">{t.chatSendButton || "Send"}</span>
      </Button>
    </form>
  );
};

