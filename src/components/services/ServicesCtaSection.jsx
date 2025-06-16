// noinspection JSUnusedGlobalSymbols

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ServicesCtaSection = ({ t, language }) => {
  return (
    <section className="py-20 gradient-bg text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === "en" ? "Ready to experience better banking?" : "Prêt à découvrir une meilleure expérience bancaire?"}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === "en" 
              ? "Join thousands of satisfied customers who have switched to Mikaty."
              : "Rejoignez des milliers de clients satisfaits qui sont passés à Mikaty."}
          </p>
          <Button className="bg-white text-primary hover:bg-gray-100 dark:bg-slate-100 dark:text-blue-700 dark:hover:bg-slate-200 px-8 py-6 h-auto text-lg">
            {language === "en" ? "Open an Account" : "Ouvrir un Compte"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesCtaSection;