import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PhoneInfoItem = ({ label, number, delay, href }) => (
  <motion.div
    className="flex items-center space-x-3 w-full md:w-auto"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-full">
      <Phone className="h-5 w-5 text-primary" />
    </div>
    <div>
      <span className="font-medium text-foreground/90 dark:text-foreground/80 text-sm md:text-base">{label}</span>
      {href ? (
        <a 
          href={href}
          className="ml-1 text-foreground/80 dark:text-foreground/70 text-sm md:text-base hover:text-primary dark:hover:text-primary-foreground hover:underline"
        >
          {number}
        </a>
      ) : (
        <span className="ml-1 text-foreground/80 dark:text-foreground/70 text-sm md:text-base">{number}</span>
      )}
    </div>
  </motion.div>
);

const ContactPhoneInfo = () => {
  const { translations: t } = useLanguage();

  const supportPhoneNumber = t.inquiryPhoneSupportNumber || "+221 78 605 62 88";
  const generalPhoneNumber = t.inquiryPhoneGeneralNumber || "+221 33 820 60 05";

  const formatTelLink = (phone) => `tel:${phone.replace(/\s+/g, "")}`;

  return (
    <motion.div
      className="flex flex-col md:flex-row md:justify-center items-start justify-start md:items-start space-y-4 md:space-y-0 md:space-x-12 mb-10 md:mb-12 pl-4 md:pl-0"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.2 } }
      }}
    >
      <PhoneInfoItem 
        label={t.inquiryPhoneSupportLabel || "Support:"} 
        number={supportPhoneNumber} 
        href={formatTelLink(supportPhoneNumber)}
        delay={0.1} 
      />
      <PhoneInfoItem 
        label={t.inquiryPhoneGeneralLabel || "General Info:"} 
        number={generalPhoneNumber} 
        href={formatTelLink(generalPhoneNumber)}
        delay={0.2} 
      />
    </motion.div>
  );
};

export default ContactPhoneInfo;