import React from "react";
import { motion } from "framer-motion";

const PageHero = ({ title, subtitle, brandName, titleClasses = "gradient-text", subtitleClasses = "text-xl text-gray-600 dark:text-gray-300 mb-8", heroPatternClass = "hero-pattern", customPadding }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const sectionPadding = customPadding || "pt-32 pb-20";

  return (
    <section className={`${sectionPadding} ${heroPatternClass}`}>
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          {brandName && (
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground/80 rounded-full text-lg font-bold mb-4">
              {brandName}
            </span>
          )}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${titleClasses}`}>
            {title}
          </h1>
          {subtitle && (
            <p className={subtitleClasses}>
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;