// // noinspection JSUnusedLocalSymbols
//
// import React from "react";
// import { motion } from "framer-motion";
// import { Mail, User, MapPin, Phone } from "lucide-react";
//
// const ContactInfoItem = ({ icon, value, subValue, delay = 0 }) => (
//   <motion.div
//     className="flex items-center"
//     initial={{ opacity: 0, x: -20 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ duration: 0.5, delay }}
//   >
//     <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 dark:group-hover:bg-primary/30">
//       {React.cloneElement(icon, { className: "h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" })}
//     </div>
//     <div>
//       <p className="text-foreground/90 dark:text-foreground/80 font-medium text-base">{value}</p>
//       {subValue && <p className="text-foreground/70 dark:text-foreground/60 text-sm">{subValue}</p>}
//     </div>
//   </motion.div>
// );
//
// // noinspection JSUnusedLocalSymbols
// const ContactInfo = ({ t, language }) => (
//   <motion.div
//     className="bg-background dark:bg-card/80 p-6 md:p-10 rounded-2xl shadow-xl border border-border/20 dark:border-border/10 w-full"
//     initial={{ opacity: 0, y: 50 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
//   >
//     <h3 className="text-2xl font-bold mb-8 text-foreground dark:text-white gradient-text">
//       {t.contactInfoTitle || "Get in Touch Directly"}
//     </h3>
//     <div className="space-y-8 group">
//        <ContactInfoItem
//         icon={<User />}
//         value={t.contactPageName || "Mikaty"}
//         subValue={t.contactPageNameSub || "Customer Support"}
//         delay={0.1}
//       />
//       <ContactInfoItem
//         icon={<Mail />}
//         value={t.contactPageEmail || "support@mikaty.com"}
//         subValue={t.contactPageEmailSub || "For General Inquiries"}
//         delay={0.2}
//       />
//       <ContactInfoItem
//         icon={<Phone />}
//         value={t.contactPagePhone || "+221 77 000 00 00"}
//         subValue={t.contactPagePhoneSub || "Mon - Fri, 9am - 6pm"}
//         delay={0.3}
//       />
//       <ContactInfoItem
//         icon={<MapPin />}
//         value={t.contactPageAddress || "Dakar, Senegal"}
//         subValue={t.contactPageAddressSub || "Head Office"}
//         delay={0.4}
//       />
//     </div>
//   </motion.div>
// );
//
// export default ContactInfo;