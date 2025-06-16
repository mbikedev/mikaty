// noinspection JSUnusedGlobalSymbols

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PremiumServicesBanner from "@/assets/images/premium-services-banner.jpg";

const PremiumServicesSection = ({ t, language }) => {
  return (
    <section className="py-20 bg-muted/50 dark:bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground dark:text-white">
              {language === "en" ? "Premium Banking Experience" : "Expérience Bancaire Premium"}
            </h2>
            <p className="text-foreground/70 dark:text-foreground/60 mb-8">
              {language === "en" 
                ? "Enjoy exclusive benefits with our premium banking services. Get personalized support, preferential rates, and access to exclusive events."
                : "Profitez d'avantages exclusifs avec nos services bancaires premium. Bénéficiez d'un support personnalisé, de taux préférentiels et d'un accès à des événements exclusifs."}
            </p>
            <div className="bg-card dark:bg-card/80 p-6 rounded-xl shadow-md mb-8 border border-border/50 dark:border-border/30">
              <div className="flex justify-between mb-4">
                <span className="text-foreground/80 dark:text-foreground/70">
                  {language === "en" ? "Standard" : "Standard"}
                </span>
                <span className="font-bold text-foreground dark:text-white">
                  {language === "en" ? "Free" : "Gratuit"}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-foreground/80 dark:text-foreground/70">
                  {language === "en" ? "Premium" : "Premium"}
                </span>
                <span className="font-bold text-foreground dark:text-white">
                  {language === "en" ? "$9.99/month" : "9,99€/mois"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/80 dark:text-foreground/70">
                  {language === "en" ? "Business" : "Entreprise"}
                </span>
                <span className="font-bold text-foreground dark:text-white">
                  {language === "en" ? "$19.99/month" : "19,99€/mois"}
                </span>
              </div>
            </div>
            <Button className="gradient-bg text-white">
              {language === "en" ? "Upgrade Your Account" : "Améliorez Votre Compte"}
            </Button>
          </motion.div>
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur-lg opacity-30 dark:opacity-40"></div>
              <div className="relative bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50 dark:border-border/30">
                <img  className="w-full h-auto" alt="Premium banking services" src={PremiumServicesBanner} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumServicesSection;