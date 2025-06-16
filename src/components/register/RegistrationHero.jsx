import React from "react";
import { motion } from "framer-motion";

const RegistrationHero = ({ t, pageContext }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const title = pageContext === "waitingList" ? t.waitingListHeroTitle : t.registerTitle;
  const subtitle = pageContext === "waitingList" ? t.waitingListHeroSubtitle : t.registerSubtitle;


  return (
    <section className="pt-32 pb-2 hero-pattern">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground/80 rounded-full text-sm font-medium mb-4">
            Mikaty
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            {title}
          </h1>
          <p className="text-xl text-foreground/70 dark:text-foreground/60 mb-8">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationHero;