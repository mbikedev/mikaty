import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CtaSection = ({ t }) => {
  return (
    <section className="py-20 gradient-bg text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.ctaTitle || "Ready to Take Control of Your Finances?"}</h2>
          <p className="text-xl mb-8 opacity-90">{t.ctaDescription || "Join Mikaty today and experience a smarter, simpler, and more secure way to manage your money. Open your free account in minutes."}</p>
          <Link to="/register">
            <Button
              className="bg-white text-primary hover:bg-gray-100 dark:bg-primary-foreground dark:text-primary dark:hover:bg-primary-foreground/90 px-8 py-6 h-auto text-lg"
            >
              {t.ctaButton || "Open Your Free Account"}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;