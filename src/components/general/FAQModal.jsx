import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ChatAssistant from '@/components/faq/ChatAssistant';

const FAQModal = ({ isOpen, onOpenChange }) => {
  if (!isOpen && !onOpenChange) {
    console.warn("FAQModal is likely used in a legacy way without external control. Consider updating.");
    return null; // Or render its old version if needed, but for now, we assume controlled usage.
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-2xl w-[90vw] p-0 bg-transparent border-none shadow-none overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ChatAssistant />
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default FAQModal;