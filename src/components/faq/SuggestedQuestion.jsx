import React from 'react';
import { Button } from '@/components/ui/button';

const SuggestedQuestion = ({ question, onClick }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="text-xs md:text-sm h-auto py-1.5 px-3 border-primary/30 text-primary/80 hover:bg-primary/10 hover:text-primary dark:border-primary/40 dark:text-primary/90 dark:hover:bg-primary/20 dark:hover:text-primary"
      onClick={onClick}
    >
      {question}
    </Button>
  );
};

export default SuggestedQuestion;