// noinspection DuplicatedCode

import React from "react";
import { motion } from "framer-motion";
import { useLanguage, translations } from "@/context/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import ChatAssistant from "@/components/faq/ChatAssistant";

const FAQ = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // noinspection DuplicatedCode
    const faqItems = [
    {
      question: t.newFaqQ1 || "1. How does MIKATY work?",
      answer: [
        t.newFaqA1_main || "Mikaty is an intuitive mobile app that offers the following features:",
        { type: 'list', items: [
            t.newFaqA1_b1 || "Instant Send & Receive",
            t.newFaqA1_b2 || "Load funds from your favorite mobile money providers (Orange Money, Wave, Free Money)",
            t.newFaqA1_b3 || "Request a Debit Card to shop securely on your favorite e-commerce platforms",
            t.newFaqA1_b4 || "Request money from other Mikaty users or cardholders worldwide",
            t.newFaqA1_b5 || "Request funds from relatives and contacts abroad",
            t.newFaqA1_b6 || "Send money via:",
            { type: 'sublist', items: [
                t.newFaqA1_b6_s1 || "Mobile Money",
                t.newFaqA1_b6_s2 || "Bank Transfers",
                t.newFaqA1_b6_s3 || "Card-to-Card Transfers",
            ]}
        ]}
      ],
    },
    {
      question: t.newFaqQ2 || "2. Is MIKATY Secure?",
      answer: [
        t.newFaqA2_main || "Yes, your security is a top priority:",
        { type: 'list', items: [
            t.newFaqA2_b1 || "Mikaty partners only with PCI DSS Level-1 certified technology providers",
            t.newFaqA2_b2 || "Fully compliant with local regulations on security and data protection",
            t.newFaqA2_b3 || "Internal teams and partners follow industry best practices and utilize advanced monitoring tools to protect all security aspects",
        ]}
      ],
    },
    {
      question: t.newFaqQ3 || "3. How do I deposit money into MIKATY?",
      answer: [
        t.newFaqA3_main || "There are two methods:",
        t.newFaqA3_methodA_title || "A. Using Mobile Money:",
        { type: 'list', items: [
            t.newFaqA3_methodA_s1 || "Choose your contact",
            t.newFaqA3_methodA_s2 || "Select the mobile money provider (Orange Money, Wave, Free Money)",
            t.newFaqA3_methodA_s3 || "Send instantly",
            t.newFaqA3_methodA_s4 || "Receive a notification with the transaction summary",
        ]},
        t.newFaqA3_methodB_title || "B. Via Bank Transfer: (Available with selected local banks)",
        { type: 'list', items: [
            t.newFaqA3_methodB_s1 || "Complete the bank details",
            t.newFaqA3_methodB_s2 || "Tap “Transfer”",
        ]}
      ],
    },
    {
      question: t.newFaqQ4 || "4. How do I load money onto my Debit Card?",
      answer: [
        { type: 'list', items: [
            t.newFaqA4_s1 || "Open the “Debit Card” menu",
            t.newFaqA4_s2 || "Select “Top-up your card”",
            t.newFaqA4_s3 || "Choose your preferred mobile money provider",
            t.newFaqA4_s4 || "Confirm and complete the transaction",
        ]}
      ],
    },
    {
      question: t.newFaqQ5 || "5. How do I send money to a contact?",
      answer: [
        { type: 'list', items: [
            t.newFaqA5_s1 || "Invite your contact to download the Mikaty app (Apple Store or Google Play)",
            t.newFaqA5_s2 || "Select the contact",
            t.newFaqA5_s3 || "Review and confirm their mobile money details",
            t.newFaqA5_s4 || "Tap “Send”",
            t.newFaqA5_s5 || "Get notified with the transaction summary",
        ]}
      ],
    },
    {
      question: t.newFaqQ6 || "6. How do I request money from a contact?",
      answer: [
        { type: 'list', items: [
            t.newFaqA6_s1 || "Select a contact from your contact list",
            t.newFaqA6_s2 || "Tap “Request”",
            t.newFaqA6_s3 || "Your contact receives a notification",
            t.newFaqA6_s4 || "If not yet a Mikaty user, they’ll be invited to download the app.",
        ]}
      ],
    },
  ];

  const renderAnswerItem = (item, keyPrefix) => {
    if (typeof item === 'string') {
      return <p key={keyPrefix} className="text-foreground/80 dark:text-foreground/70 mb-2">{item}</p>;
    }
    if (item.type === 'list') {
      return (
        <ul key={keyPrefix} className="list-disc space-y-1 pl-6 my-2">
          {item.items.map((listItem, index) => (
            <li key={`${keyPrefix}-li-${index}`} className="text-foreground/80 dark:text-foreground/70">
              {renderAnswerItem(listItem, `${keyPrefix}-li-${index}`)}
            </li>
          ))}
        </ul>
      );
    }
    if (item.type === 'sublist') {
      return (
        <ul key={keyPrefix} className="list-[circle] space-y-1 pl-4 mt-1">
          {item.items.map((subItem, index) => (
            <li key={`${keyPrefix}-sli-${index}`} className="text-foreground/80 dark:text-foreground/70">{subItem}</li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block p-4 mb-6 bg-primary/10 rounded-full text-primary">
            <HelpCircle size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{t.newFaqPageTitle || "Frequently Asked Questions"}</h1>
          <p className="text-lg md:text-xl text-foreground/70 dark:text-foreground/60 max-w-2xl mx-auto">{t.newFaqPageSubtitle || "Find answers to common questions about Mikaty."}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/70 dark:border-border/50">
                <AccordionTrigger className="text-lg text-foreground hover:text-primary dark:text-foreground/90 dark:hover:text-primary text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="prose prose-sm dark:prose-invert max-w-none">
                  {item.answer.map((contentItem, idx) => renderAnswerItem(contentItem, `q${index}-ans${idx}`))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 md:mt-24"
        >
          <ChatAssistant />
        </motion.div>

      </div>
    </div>
  );
};

export default FAQ;