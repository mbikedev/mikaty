// noinspection JSUnresolvedReference

import React from "react";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {CreditCard, Building, Zap} from "lucide-react";
import {useLanguage, translations} from "@/context/LanguageContext";
import PageHero from "@/components/general/PageHero";
import ServiceCard from "@/components/services/ServiceCard";
import DetailedFeaturesSection from "@/components/services/DetailedFeaturesSection";
import ServicesSmile from "@/assets/gif/services-smiling.gif"

const Services = () => {
    const {language} = useLanguage();
    const t = translations[language];

    const staggerContainer = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const servicesData = [
        {
            path: "/services/personal-accounts",
            icon: <CreditCard className="h-7 w-7 text-primary"/>,
            title: t.service1Title,
            description: t.service1Description,
            features: [
                t.service1Feature1 || "Choose the plan that best suits your needs",
                t.service1Feature2 || "Free transfers",
                t.service1Feature3 || "Lowest cost for remittances from abroad",
                t.service1Feature4 || "Wire transfer to any bank in UEMOA",
                t.service1Feature5 || "Digital card for online payments and tap-to-pay at the shop",
            ],
        },
        {
            path: "/services/business-solutions",
            icon: <Building className="h-7 w-7 text-primary"/>,
            title: t.service2Title,
            description: t.service2Description,
            features: [
                t.service2Feature1 || "Spend with the card and get additional benefits",
                t.service2Feature2 || "Pay your advertisements with your card",
                t.service2Feature3 || "Shop from the e-commerce site with your card",
                t.service2Feature4 || "For your business lunches, use tap-to-pay",
                t.service2Feature5 || "Cover your travel expenses with your card.",
            ],
        },
    ];

    const textContentVariants = {
        hidden: {opacity: 0, x: -50},
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    };

    const imageContentVariants = {
        hidden: {opacity: 0, x: 50},
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut",
            }
        }
    };


    // noinspection JSUnresolvedReference
    return (
        <>
            <PageHero
                title={t.servicesTitle}
                subtitle={t.servicesSubtitle}
                brandName="Mikaty"
                titleClasses="gradient-text"
                subtitleClasses="text-xl text-gray-600 mb-4"
                customPadding="pt-32 pb-0 hero-pattern"
            />

            <section className="py-0 md:py-0 bg-slate-100 dark:bg-slate-800/30 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: true, amount: 0.3}}
                            variants={textContentVariants}
                            className="text-center md:text-left"
                        >
                            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4 md:mb-6 mx-auto md:mx-0">
                                <Zap className="h-8 w-8 text-primary"/>
                            </div>
                            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground dark:text-white mb-4 md:mb-6 leading-tight">
                                {t.services_slogan || "Powering the Future of Finance — Fast, Secure, and Borderless."}
                            </h2>
                            <p className="text-lg text-foreground/70 dark:text-foreground/60 max-w-2xl mx-auto md:mx-0">
                                {t.services_page_subtitle || "Tailored financial solutions to meet your everyday needs and long-term goals."}
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: true, amount: 0.3}}
                            variants={imageContentVariants}
                            className="w-full"
                        >

                            <div
                                className="relative w-full bg-card dark:bg-card/80 rounded-2xl shadow-xl border border-border/20 dark:border-border/10 overflow-hidden pb-0 md:pb-0"
                            >
                                <img
                                    src={ServicesSmile}
                                    alt="Smiling woman holding phone and card - Mikaty services"
                                    className="w-full h-auto rounded-xl shadow-lg"
                                />
                            </div>


                        </motion.div>
                    </div>
                </div>
            </section>

            <section className=" md:py-8">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={staggerContainer}
                    >
                        {servicesData.map((service, index) => (
                            <Link to={service.path} key={index} className="flex">
                                <ServiceCard
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.description}
                                    features={service.features}
                                    buttonText={language === "en" ? "Learn More" : "En Savoir Plus"}
                                />
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </section>

            <DetailedFeaturesSection/>
        </>
    );
};

export default Services;