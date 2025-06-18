// noinspection JSCheckFunctionSignatures

import React from "react";
import {motion} from "framer-motion";
import {useLanguage} from "@/context/LanguageContext";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {
    Smartphone,
    CreditCard,
    Send,
    DownloadCloud,
    Landmark,
    Replace,
    SmartphoneNfc,
    ArrowRight,
    RadioTower,
    HeartHandshake as Handshake
} from 'lucide-react';
import PageHero from "@/components/general/PageHero";
import GoVirtual from "@/assets/videos/show2.mp4"

// noinspection JSCheckFunctionSignatures
const FeatureCard = ({icon, title, description, delay}) => {
    const iconVariants = {
        initial: {scale: 1},
        hover: {
            scale: 1.15,
            rotate: 5,
            transition: {duration: 0.3, type: "spring", stiffness: 300}
        },
        tap: {scale: 0.9}
    };

    return (
        <motion.div
            className="bg-card dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full border border-border/20 dark:border-border/10 card-gradient-hover"
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay}}
            whileHover="hover"
            whileTap="tap"
        >
            <motion.div
                className="p-4 mb-5 bg-gradient-to-br from-primary to-purple-600 text-primary-foreground rounded-full shadow-md"
                variants={iconVariants}
                initial="initial"
            >
                {React.cloneElement(icon, {size: 32})}
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-gray-100">{title}</h3>
            <p className="text-muted-foreground dark:text-gray-400 text-sm leading-relaxed">{description}</p>
        </motion.div>
    );
};

const WhatWeCanDo = () => {
    const {translations: t} = useLanguage();

    const features = [
        {
            id: "loadMikatyOMWave",
            icon: <RadioTower/>,
            title: t.wwcdFeature1TitleNew || "Load MIKATY with Orange Money/Wave",
            description: t.wwcdFeature1DescNew || "Easily fund your MIKATY account using your Orange Money or Wave."
        },
        {
            id: "sendReceiveMoney",
            icon: <Send/>,
            title: t.wwcdFeature2TitleNew || "Send and Receive Money",
            description: t.wwcdFeature2DescNew || "Instantly transfer and get funds with MIKATY users."
        },
        {
            id: "requestMoneyPeers",
            icon: <Handshake/>,
            title: t.wwcdFeature3TitleNew || "Request Money from MIKATY Peers",
            description: t.wwcdFeature3DescNew || "Conveniently request payments from other MIKATY users."
        },
        {
            id: "sendToOMWave",
            icon: <Smartphone/>,
            title: t.wwcdFeature4TitleNew || "Send to Orange Money/Wave Users",
            description: t.wwcdFeature4DescNew || "Transfer funds directly to Orange Money or Wave mobile wallets."
        },
        {
            id: "createVirtualCard",
            icon: <CreditCard/>,
            title: t.wwcdFeature5TitleNew || "Create Your Virtual Debit Card",
            description: t.wwcdFeature5DescNew || "Generate secure virtual cards for online payments in seconds."
        },
        {
            id: "loadFundsDebit",
            icon: <DownloadCloud/>,
            title: t.wwcdFeature6TitleNew || "Load Funds into Your Debit Card",
            description: t.wwcdFeature6DescNew || "Top up your MIKATY virtual debit card effortlessly."
        },
        {
            id: "transferToBank",
            icon: <Landmark/>,
            title: t.wwcdFeature7TitleNew || "Transfer to Your Bank Account",
            description: t.wwcdFeature7DescNew || "Move funds from MIKATY to your linked bank account."
        },
        {
            id: "cardToCardTransfer",
            icon: <Replace/>,
            title: t.wwcdFeature8TitleNew || "Card 2 Card Transfer",
            description: t.wwcdFeature8DescNew || "Transfer money directly between MIKATY cards."
        },
        {
            id: "configureAppleGooglePay",
            icon: <SmartphoneNfc/>,
            title: t.wwcdFeature9TitleNew || "Configure Apple Pay or Google Pay",
            description: t.wwcdFeature9DescNew || "Link your MIKATY card for seamless mobile payments."
        },
    ];

    const imageVariants = {
        initial: {y: 0},
        animate: {
            y: [0, -8, 0],
            transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const imageHoverEffect = {
        scale: 1.03,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
        transition: {duration: 0.3}
    };


    return (
        <>
            <PageHero
                title={t.wwcdTitle || "What We Can Do"}
                subtitle={t.wwcdSubtitle || "Empowering Your Financial Journey with Innovative Solutions"}
                backgroundImage={GoVirtual}
                overlayOpacity={0.6}
                customPadding="pt-32"
            />
            <section
                className="py-2 md:py-2 bg-gradient-to-b from-background to-secondary/10 dark:from-background dark:to-secondary/5">
                <div className="container mx-auto px-4 md:px-6">

                    <div className="relative w-full h-[60vh] overflow-hidden rounded-xl shadow-2xl mb-12">
                        {/* Video background */}
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute top-0 left-0 w-full h-full object-cover z-0"
                        >
                            <source src={GoVirtual} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>

                        {/* Overlay content */}
                        <div
                            className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 md:px-8 bg-black/40">
                            <motion.div
                                initial={{opacity: 0, y: -20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.5, delay: 0.2}}
                                className="text-white mb-4"
                            >
                                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
                                    {t.wwcd_go_virtual_title || "Go virtual."}
                                </h2>

                                <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-white bg-black/50 px-6 py-4 rounded-2xl backdrop-blur-sm shadow-lg">
                                    {t.wwcd_go_virtual_desc || "Enjoy the convenience of your Mikaty Digital Card — just like Apple Pay or Google Wallet. Instantly create your card and start making secure payments anywhere, anytime."}
                                </p>


                            </motion.div>
                        </div>
                    </div>


                    <motion.div
                        initial={{opacity: 0, y: -20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5}}
                        className="text-center mb-8 md:mb-12 mt-8 md:mt-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-primary-foreground">
                            {t.wwcdSectionTitle || "Our Core Capabilities"}
                        </h2>
                        <p className="text-lg md:text-xl text-foreground/80 dark:text-foreground/70 max-w-3xl mx-auto">
                            {t.wwcdSectionSubtitle || "We provide a comprehensive suite of financial tools and services designed to simplify your life and help you achieve your ambitions."}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={feature.id}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                delay={index * 0.1}
                                t={t}
                            />
                        ))}
                    </div>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, delay: features.length * 0.1}}
                        className="text-center mt-12 md:mt-16"
                    >
                        <Button size="lg" className="gradient-bg text-primary-foreground px-10 py-6 text-lg group"
                                asChild>
                            <Link to="/register">
                                {t.getStarted || "Get Started Today"}
                                <ArrowRight
                                    className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"/>
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default WhatWeCanDo;