import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PageHero from "@/components/general/PageHero";
import { Card, CardContent } from "@/components/ui/card";

const BankTransfersUEMOA = () => {
  const { translations: t } = useLanguage();

  const pageContent = {
    title: t.bankTransfersUEMOATitle || "Bank Transfers in UEMOA",
    subtitle: t.bankTransfersUEMOASubtitle || "Send Money Anywhere Within the Region",
    body: t.bankTransfersUEMOABody || "Easily transfer funds from your Mikaty account to any bank account across the UEMOA zone (West African Economic and Monetary Union). Whether you're paying rent, supporting family, or doing business—our platform makes it effortless.",
    features: [
      t.bankTransfersUEMOAFeature1 || "Compatible with all UEMOA banks",
      t.bankTransfersUEMOAFeature2 || "Competitive fees and fast processing",
      t.bankTransfersUEMOAFeature3 || "Reliable, secure and trackable transactions",
      t.bankTransfersUEMOAFeature4 || "24/7 access through the Mikaty app",
    ],
    footerLine: t.bankTransfersUEMOAFooterLine || "A cross-border bank transfer experience made local, easy, and trusted.",
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <div className="bg-gradient-to-r from-[#2D0036] to-[#3c0470] text-[#E0D8F0] min-h-screen">
      <PageHero
        title={pageContent.title}
        subtitle={pageContent.subtitle}
        titleClasses="text-5xl md:text-6xl font-bold text-white"
        subtitleClasses="text-xl text-[#E0D8F0]/90 mb-8"
        customPadding="pt-32 pb-16"
        heroPatternClass=""
      />

      <div className="max-w-4xl mx-auto px-6 md:px-10 pb-16 md:pb-24 space-y-12">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-10 shadow-xl border border-white/10"
        >
          <p className="text-lg md:text-xl mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: pageContent.body.replace('UEMOA zone (West African Economic and Monetary Union)', '<strong>UEMOA zone (West African Economic and Monetary Union)</strong>') }}>
            
          </p>
          
          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="p-0">
              <ul className="space-y-4">
                {pageContent.features.map((feature, index) => (
                  <li key={index} className="flex items-start p-4 bg-white/5 rounded-lg border border-white/10">
                    <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-purple-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.p 
          className="text-xl text-center font-semibold text-purple-300"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pageContent.footerLine}
        </motion.p>
      </div>
    </div>
  );
};

export default BankTransfersUEMOA;