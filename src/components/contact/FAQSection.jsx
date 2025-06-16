// // noinspection DuplicatedCode,JSUnresolvedReference
//
// import React from "react";
// import { motion } from "framer-motion";
// import { HelpCircle } from "lucide-react";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { useLanguage, translations as appTranslations } from "@/context/LanguageContext";
//
// const FAQSection = () => {
//   const { language } = useLanguage();
//   const t = appTranslations[language];
//
//   // noinspection DuplicatedCode
//     const faqItems = [
//     {
//       question: t.newFaqQ1 || "1. How does MIKATY work?",
//       answer: [
//         t.newFaqA1_main || "Mikaty is an intuitive mobile app that offers the following features:",
//         { type: 'list', items: [
//             t.newFaqA1_b1 || "Instant Send & Receive",
//             t.newFaqA1_b2 || "Load funds from your favorite mobile money providers (Orange Money, Wave, Free Money)",
//             t.newFaqA1_b3 || "Request a Debit Card to shop securely on your favorite e-commerce platforms",
//             t.newFaqA1_b4 || "Request money from other Mikaty users or cardholders worldwide",
//             t.newFaqA1_b5 || "Request funds from relatives and contacts abroad",
//             t.newFaqA1_b6 || "Send money via:",
//             { type: 'sublist', items: [
//                 t.newFaqA1_b6_s1 || "Mobile Money",
//                 t.newFaqA1_b6_s2 || "Bank Transfers",
//                 t.newFaqA1_b6_s3 || "Card-to-Card Transfers",
//             ]}
//         ]}
//       ],
//     },
//     {
//       question: t.newFaqQ2 || "2. Is MIKATY Secure?",
//       answer: [
//         t.newFaqA2_main || "Yes, your security is a top priority:",
//         { type: 'list', items: [
//             t.newFaqA2_b1 || "Mikaty partners only with PCI DSS Level-1 certified technology providers",
//             t.newFaqA2_b2 || "Fully compliant with local regulations on security and data protection",
//             t.newFaqA2_b3 || "Internal teams and partners follow industry best practices and utilize advanced monitoring tools to protect all security aspects",
//         ]}
//       ],
//     },
//     {
//       question: t.newFaqQ3 || "3. How do I deposit money into MIKATY?",
//       answer: [
//         t.newFaqA3_main || "There are two methods:",
//         t.newFaqA3_methodA_title || "A. Using Mobile Money:",
//         { type: 'list', items: [
//             t.newFaqA3_methodA_s1 || "Choose your contact",
//             t.newFaqA3_methodA_s2 || "Select the mobile money provider (Orange Money, Wave, Free Money)",
//             t.newFaqA3_methodA_s3 || "Send instantly",
//             t.newFaqA3_methodA_s4 || "Receive a notification with the transaction summary",
//         ]},
//         t.newFaqA3_methodB_title || "B. Via Bank Transfer: (Available with selected local banks)",
//         { type: 'list', items: [
//             t.newFaqA3_methodB_s1 || "Complete the bank details",
//             t.newFaqA3_methodB_s2 || "Tap “Transfer”",
//         ]}
//       ],
//     },
//     // Add more FAQs as needed or ensure these are sufficient for the contact page
//   ];
//
//   const renderAnswerItem = (item, keyPrefix) => {
//     if (typeof item === 'string') {
//       return <p key={keyPrefix} className="text-foreground/80 dark:text-foreground/70 mb-2 last:mb-0">{item}</p>;
//     }
//     if (item.type === 'list') {
//       return (
//         <ul key={keyPrefix} className="list-disc space-y-1.5 pl-6 my-3">
//           {item.items.map((listItem, index) => (
//             <li key={`${keyPrefix}-li-${index}`} className="text-foreground/80 dark:text-foreground/70">
//               {renderAnswerItem(listItem, `${keyPrefix}-li-${index}`)}
//             </li>
//           ))}
//         </ul>
//       );
//     }
//     if (item.type === 'sublist') {
//       return (
//         <ul key={keyPrefix} className="list-[circle] space-y-1 pl-5 mt-1.5">
//           {item.items.map((subItem, index) => (
//             <li key={`${keyPrefix}-sli-${index}`} className="text-foreground/80 dark:text-foreground/70">{subItem}</li>
//           ))}
//         </ul>
//       );
//     }
//     return null;
//   };
//
//   const sectionVariants = (delay = 0) => ({
//     initial: { opacity: 0, y: 30 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99], delay }
//     }
//   });
//
//   // noinspection JSUnresolvedReference
//     return (
//     <motion.section
//       className="py-16 md:py-24 bg-[#f0f4fa] dark:bg-slate-800/30" // Slightly different background for FAQ section
//       variants={sectionVariants(0.5)}
//       initial="initial"
//       whileInView="animate"
//       viewport={{ once: true, amount: 0.1 }}
//     >
//       <div className="container mx-auto px-4 md:px-6">
//         <motion.div
//           variants={sectionVariants(0)}
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true, amount: 0.3 }}
//           className="text-center mb-12 md:mb-16"
//         >
//           <div className="inline-flex items-center justify-center p-4 mb-6 bg-primary/10 dark:bg-primary/20 rounded-full text-primary">
//             <HelpCircle size={48} className="text-primary" />
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t.faqTitle || "Frequently Asked Questions"}</h2>
//           <p className="text-lg md:text-xl text-foreground/70 dark:text-foreground/60 max-w-2xl mx-auto">{t.faqSubtitleContact || "Quick answers for your immediate queries. For more, visit our main FAQ page."}</p>
//         </motion.div>
//
//         <motion.div
//           variants={sectionVariants(0.1)}
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true, amount: 0.2 }}
//           className="max-w-3xl mx-auto"
//         >
//           <Accordion type="single" collapsible className="w-full space-y-0">
//             {faqItems.filter(item => item.question && item.answer && item.answer.length > 0).map((item, index) => (
//                <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
//                 <AccordionItem value={`item-${index}`} className="border-none shadow-none bg-transparent dark:bg-transparent mb-4 last:mb-0">
//                   <AccordionTrigger className="text-base md:text-lg hover:no-underline text-left">
//                     {item.question}
//                   </AccordionTrigger>
//                   <AccordionContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
//                      {item.answer.map((contentItem, idx) => renderAnswerItem(contentItem, `q${index}-ans${idx}`))}
//                   </AccordionContent>
//                 </AccordionItem>
//               </motion.div>
//             ))}
//           </Accordion>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// };
//
// export default FAQSection;