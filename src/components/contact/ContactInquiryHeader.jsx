import React from "react";
import { motion } from "framer-motion";
import { User, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PageHero from "@/components/general/PageHero";

const ContactInfoItem = ({ icon: Icon, text, delay, href }) => (
  <motion.div 
    className="flex items-center space-x-3 w-full md:w-auto"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-full">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    {href ? (
      <a 
        href={href} 
        className="text-foreground/80 dark:text-foreground/70 text-sm md:text-base hover:text-primary dark:hover:text-primary-foreground hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    ) : (
      <span className="text-foreground/80 dark:text-foreground/70 text-sm md:text-base">{text}</span>
    )}
  </motion.div>
);

const ContactInquiryHeader = () => {
  const { translations: t } = useLanguage();
  const emailAddress = t.inquiryEmail || "info@mikaty.com";

  return (
    <>
      <PageHero
        title={t.inquiryPageTitle || "Get in Touch."}
        subtitle=""
        brandName=""
        titleClasses="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-primary dark:text-primary-foreground mt-0"
        containerClasses="pt-16 pb-8 md:pt-20 md:pb-10"
      />
      <motion.div 
        className="flex flex-col md:flex-row md:justify-center md:items-center items-start justify-start space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-8 pl-4 md:pl-0"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } }
        }}
      >
        <ContactInfoItem icon={User} text={t.inquiryRequestInfo || "Request for infos"} delay={0.1} />
        <ContactInfoItem icon={Mail} text={emailAddress} href={`mailto:${emailAddress}`} delay={0.2} />
      </motion.div>
    </>
  );
};

export default ContactInquiryHeader;