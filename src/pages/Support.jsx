import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone } from "lucide-react";
import PageHero from "@/components/general/PageHero";
import { useLanguage, translations } from "@/context/LanguageContext";

const SupportCenter = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay }
    }
  });

  return (
      <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn()}
          className="bg-gradient-to-b from-[#f9fafe] via-[#f1f4fd] to-[#eef2fb] dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen"
      >
        <PageHero
            title={t.supportCenterTitle}
            subtitle={t.supportCenterSubtitle}
            brandName="Mikaty"
            titleClasses="gradient-text"
            subtitleClasses="text-xl text-foreground/70 dark:text-foreground/60 mb-6"
            heroPatternClass=""
            customPadding="pt-28 pb-16 md:pt-32 md:pb-20 bg-transparent dark:bg-transparent"
        />

        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
                className="backdrop-blur-md bg-white/80 dark:bg-slate-800/70 rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-500/30 p-10 md:p-14 space-y-10 lg:space-y-0 max-w-4xl mx-auto text-center grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8"
                variants={fadeIn(0.2)}
            >
              {/* Request for infos */}
              <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center gap-4 transition-transform duration-300"
              >
              <span className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white flex-shrink-0 shadow-lg">
                <User className="h-6 w-6 md:h-7 md:w-7" />
              </span>
                <div className="flex flex-col space-y-1">
                <span className="text-lg font-medium">
                  {t.supportRequestForInfos}
                </span>
                  <a
                      href="mailto:info@mikaty.com"
                      className="text-lg font-medium hover:underline text-purple-700 dark:text-purple-300"
                  >
                    info@mikaty.com
                  </a>
                </div>
              </motion.div>

              {/* Support */}
              <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center gap-4 transition-transform duration-300"
              >
              <span className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white flex-shrink-0 shadow-lg">
                <Phone className="h-6 w-6 md:h-7 md:w-7" />
              </span>
                <div className="flex flex-col space-y-1">
                  <span className="text-lg font-medium">{t.supportLabelSupport}</span>
                  <span className="text-lg font-medium">+221 78 605 62 88</span>
                </div>
              </motion.div>

              {/* General Info */}
              <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center gap-4 transition-transform duration-300"
              >
              <span className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white flex-shrink-0 shadow-lg">
                <Phone className="h-6 w-6 md:h-7 md:w-7" />
              </span>
                <div className="flex flex-col space-y-1">
                  <span className="text-lg font-medium">{t.supportLabelGeneralInfo}</span>
                  <span className="text-lg font-medium">+221 33 820 60 05</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </motion.div>

  );
};

export default SupportCenter;
