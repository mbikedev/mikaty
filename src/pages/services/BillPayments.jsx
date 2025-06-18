// noinspection DuplicatedCode

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PageHero from "@/components/general/PageHero";
import { Card, CardContent } from "@/components/ui/card";

const BillPayments = () => {
  const { translations: t } = useLanguage();

  const pageContent = {
    title: t.billPaymentsTitle || "Bill Payments via App",
    subtitle: t.billPaymentsSubtitle || "All Your Bills. One Place.",
    body: t.billPaymentsBody || "Pay your electricity, water, internet, and other utility bills directly from your Mikaty app. No queues, no delays — just simple, stress-free payments.",
    features: [
      t.billPaymentsFeature1 || "Pay national utility and service providers",
      t.billPaymentsFeature2 || "Track due dates and payment history",
      t.billPaymentsFeature3 || "Get notified before your bills are due",
    ],
    footerLine: t.billPaymentsFooterLine || "Stay on top of your bills — without ever leaving your couch.",
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
          <p className="text-lg md:text-xl mb-8 leading-relaxed">
            {pageContent.body}
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

export default BillPayments;