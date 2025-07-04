import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage, translations } from "@/context/LanguageContext";

const ServiceCard = ({ icon, title, description, features, buttonText, onClick }) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  const hoverAnimation = {
    scale: 1.03,
    boxShadow: "0px 10px 25px rgba(var(--primary-rgb), 0.15)",
    transition: { duration: 0.3, ease: "circOut" }
  };
  
  return (
    <motion.div 
      className="flex flex-col bg-card dark:bg-card/80 rounded-xl shadow-lg overflow-hidden border border-border/50 dark:border-border/30 h-full w-full"
      variants={cardVariants}
      whileHover={{ ...hoverAnimation }}
      onClick={onClick}
    >
      <div className="p-8 flex flex-col flex-grow">
        <div className="w-14 h-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-6 flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-foreground dark:text-white">{title}</h3>
        <p className="text-foreground/70 dark:text-foreground/60 mb-6 text-sm leading-relaxed">{description}</p>
        
        {/* Hidden features list - keeping the structure but not displaying */}
        <div className="hidden">
          <ul className="space-y-3 mb-8 flex-grow">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-3 mt-1 bg-green-500/10 dark:bg-green-400/20 rounded-full p-1 flex-shrink-0">
                  <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-foreground/80 dark:text-foreground/70 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-3 mt-auto flex-shrink-0">
          <Button className="gradient-bg w-full" asChild={!onClick}>
            {onClick ? buttonText : <span>{buttonText}</span>}
          </Button>
          <Button variant="outline" className="w-full">
            {t.stayTunedButton}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;