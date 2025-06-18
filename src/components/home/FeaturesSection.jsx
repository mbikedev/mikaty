"use client";
import React from "react";
import { motion } from "framer-motion";
import { Rocket, Smartphone, Shield, Globe, LayoutGrid } from "lucide-react";

const FeatureItem = ({ icon, title, description, variants }) => (
    <motion.div
        className="bg-[rgb(50,25,67)] p-6 rounded-2xl shadow-xl border border-transparent dark:border-white/20 transition-all duration-300 hover:scale-[1.02] flex flex-col items-center text-center"
        variants={variants}
    >
        <div className="mb-5 bg-white/10 p-3 rounded-xl w-fit shadow-sm">
            {React.cloneElement(icon, { className: "w-7 h-7 text-white" })}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 tracking-tight">{title}</h3>
        <p className="text-white/80 text-sm md:text-base leading-relaxed">{description}</p>
    </motion.div>
);

const FeaturesSection = ({ t }) => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const features = [
        { icon: <Rocket />, titleKey: "feature1Title", descriptionKey: "feature1Description" },
        { icon: <Smartphone />, titleKey: "feature2TitleUpdated", descriptionKey: "feature2DescriptionUpdated" },
        { icon: <Shield />, titleKey: "feature3Title", descriptionKey: "feature3Description" },
        { icon: <Globe />, titleKey: "feature4Title", descriptionKey: "feature4Description" },
        { icon: <LayoutGrid />, titleKey: "featureCatalogTitle", descriptionKey: "featureCatalogDescription" }
    ];

    return (
        <section className="py-8 text-black bg-white dark:bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                    variants={fadeIn}
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-black dark:text-white">
                        {t.featuresTitle}
                    </h2>
                    <p className="text-base md:text-lg text-black/80 dark:text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
                        {t.featuresSubtitle}
                    </p>
                </motion.div>


                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                    variants={staggerContainer}
                >
                    {features.slice(0, 3).map((f, i) => (
                        <FeatureItem key={i} icon={f.icon} title={t[f.titleKey]} description={t[f.descriptionKey]}
                                     variants={fadeIn}/>
                    ))}
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                    variants={staggerContainer}
                >
                    {features.slice(3).map((f, i) => (
                        <FeatureItem key={i + 3} icon={f.icon} title={t[f.titleKey]} description={t[f.descriptionKey]}
                                     variants={fadeIn}/>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;
