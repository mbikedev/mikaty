// noinspection DuplicatedCode

import React from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/general/PageHero";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PersonalAccounts = () => {
  const { translations: t } = useLanguage();

  const features = [
    {
      titleKey: "featureSmartSpendingTitle",
      descriptionKey: "featureSmartSpendingDescription"
    },
    {
      titleKey: "featureAdPaymentsTitle",
      descriptionKey: "featureAdPaymentsDescription"
    },
    {
      titleKey: "featureIntegratedCommerceTitle",
      descriptionKey: "featureIntegratedCommerceDescription"
    },
    {
      titleKey: "featureTapToPayTitle",
      descriptionKey: "featureTapToPayDescription"
    },
    {
      titleKey: "featureExpenseManagementTitle",
      descriptionKey: "featureExpenseManagementDescription"
    }
  ];

  const whyMikatyPoints = [
    "whyMikatyPoint1",
    "whyMikatyPoint2",
    "whyMikatyPoint3",
    "whyMikatyPoint4"
  ];

  const topUpFeatures = [
    "topUpFeature1",
    "topUpFeature2",
    "topUpFeature3"
  ];
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <div className="bg-gradient-to-r from-[#2D0036] to-[#3c0470] text-[#E0D8F0] min-h-screen">
      <PageHero
        title={t.personalAccountsTitle}
        subtitle={t.personalAccountsHeroSubtitle}
        titleClasses="text-5xl md:text-6xl font-bold text-white"
        subtitleClasses="text-xl text-[#E0D8F0]/90 mb-8"
        customPadding="pt-32 pb-16"
        heroPatternClass=""
      />

      <div className="max-w-5xl mx-auto px-6 md:px-10 pb-16 md:pb-24 space-y-12">
        <motion.p 
          className="text-lg md:text-xl text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {t.personalAccountsIntro}
        </motion.p>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          data-aos="fade-up"
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-10 shadow-xl border border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-6">{t.featuresSectionTitle}</h2>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-1">{t[feature.titleKey]}</h3>
                <p className="text-[#E0D8F0]/90">{t[feature.descriptionKey]}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          data-aos="fade-up"
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-10 shadow-xl border border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-6">{t.whyMikatyTitle}</h2>
          <ul className="space-y-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyMikatyPoints.map((pointKey, index) => (
              <li key={index} className="flex items-center p-3 bg-white/5 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-purple-400 mr-3 flex-shrink-0" />
                <span className="text-lg">{t[pointKey]}</span>
              </li>
            ))}
          </ul>
           <p className="mt-8 text-xl text-center font-semibold text-purple-300">{t.closingStatement}</p>
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          data-aos="fade-up"
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-10 shadow-xl border border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-3">{t.topUpTitle}</h2>
          <p className="text-xl font-medium text-purple-300 mb-4">{t.topUpSubtitle}</p>
          <p className="mb-6 text-[#E0D8F0]/90">{t.topUpDescription}</p>
          <ul className="space-y-2 mb-6">
            {topUpFeatures.map((featureKey, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                <span>{t[featureKey]}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg font-medium text-center">{t.topUpClosing}</p>
        </motion.section>
      </div>
    </div>
  );
};

export default PersonalAccounts;