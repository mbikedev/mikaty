import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Cadenas from"@/assets/images/cadenas.webp"
import sectionBackgroundImage from"@/assets/images/cadenas.webp"
import { 
  ShieldCheck, 
  Key, 
  Lock as LucideLock, 
  Clock, 
  ShieldHalf, 
  Award,
  FolderLock 
} from 'lucide-react';

const SecuritySection = () => {
  const { translations } = useLanguage();
  const t = translations || {}; 
  // const sectionBackgroundImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/d9983a96-d946-4810-b34e-643479ab9517/e1d379d64fd854fdba4bcbbbee2f17cb.webp";
  // const lockImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/d9983a96-d946-4810-b34e-643479ab9517/e1d379d64fd854fdba4bcbbbee2f17cb.webp";

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const textContentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  
  const badgesContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.4 
      } 
    },
  };

  const badgeItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const trustBadges = [
    { id: 'pci', icon: ShieldCheck, textKey: 'securityBadge1', defaultText: 'PCI DSS Certified', iconColor: 'text-green-400' },
    { id: 'encryption', icon: Key, textKey: 'securityBadge2', defaultText: 'Secure Encryption', iconColor: 'text-blue-400' },
    { id: 'privacy', icon: LucideLock, textKey: 'securityBadge3', defaultText: 'Data Privacy', iconColor: 'text-purple-400' },
    { id: 'monitoring', icon: Clock, textKey: 'securityBadge4', defaultText: '24/7 Monitoring', iconColor: 'text-orange-400' },
    { id: 'gdpr', icon: ShieldHalf, textKey: 'securityBadge5', defaultText: 'GDPR Compliant', iconColor: 'text-teal-400' },
    { id: 'iso', icon: Award, textKey: 'securityBadge6', defaultText: 'ISO 27001 Certified', iconColor: 'text-yellow-400' },
  ];

  return (
    <motion.section
      style={{ backgroundImage: `url(${sectionBackgroundImage})` }}
      className="relative bg-cover bg-center bg-no-repeat py-16 md:py-24 lg:py-32"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative container mx-auto px-4 text-white z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-12 md:mb-16 lg:mb-20">
          <motion.div 
            className="text-center md:text-left md:order-1"
            variants={textContentVariants}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 md:mb-4 leading-tight flex items-center justify-center md:justify-start">
              <FolderLock className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mr-3 text-primary" />
              {t.securitySectionTitle || "Security"}
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-4 md:mb-6 leading-tight">
              <span className="flex items-center justify-center md:justify-start">
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-2 text-green-400" />
                {t.securitySectionSubtitlePCI || "PCI DSS"}
              </span>
              <span>{t.securitySectionSubtitleCompliance || "Compliance"}</span>
            </h3>
            <p className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4">
              {t.securitySectionHeading || "Security is at the core of everything we do."}
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-gray-200 dark:text-gray-300">
              {t.securitySectionParagraphDB || "PCI compliance ensures that stringent security measures are consistently applied across Mikaty and its partners."}
            </p>
          </motion.div>

          <motion.div 
            className="flex justify-center items-center md:order-2"
            variants={imageVariants}
          >
            <img 
              src={Cadenas}
              alt={t.securitySectionImageAlt || "Abstract representation of digital security with a padlock"} 
              className="w-full max-w-md md:max-w-sm lg:max-w-md h-auto rounded-lg shadow-2xl object-contain"
              style={{ maxHeight: '400px' }}
            />
          </motion.div>
        </div>

        <motion.div 
          className="flex justify-center flex-wrap gap-3 sm:gap-4 mt-8 z-10"
          variants={badgesContainerVariants}
        >
          {trustBadges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <motion.div 
                key={badge.id} 
                className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/10 dark:bg-black/20 text-white dark:text-gray-200 rounded-lg text-xs sm:text-sm backdrop-blur-md shadow-lg"
                variants={badgeItemVariants}
              >
                <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${badge.iconColor} shrink-0`} />
                <span>
                  {t[badge.textKey] || badge.defaultText}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SecuritySection;