// noinspection DuplicatedCode

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import QRCode from 'react-qr-code';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/context/LanguageContext';
import WhatWeDoFinancialFreedomImage from '@/assets/images/what-we-do-financial-freedom.webp';

const WhatWeDoPage = () => {
    const { translations: t } = useLanguage();

    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [isQrLoading, setIsQrLoading] = useState(true);

    const advantages = [
        { text: t.whatWeDoAdvantage1 || "We unlock your access to global e-commerce with your debit cards." },
        { text: t.whatWeDoAdvantage2 || "You transfer and receive: easy, fast and secure from mobile-money, from cards, from bank accounts." },
        { text: t.whatWeDoAdvantage3 || "You achieve your financial goals with lower costs." },
    ];

    // Handle QR modal loading + auto-close
    useEffect(() => {
        if (isQrModalOpen) {
            setIsQrLoading(true);

            const loadingTimer = setTimeout(() => {
                setIsQrLoading(false);
            }, 1000); // simulate 1s loading

            const autoCloseTimer = setTimeout(() => {
                setIsQrModalOpen(false);
            }, 8000); // auto-close after 8s

            return () => {
                clearTimeout(loadingTimer);
                clearTimeout(autoCloseTimer);
            };
        }
    }, [isQrModalOpen]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const textContentVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <>
            {/* Hero Section */}
            <section className="pt-36 pb-16 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-center">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500">
                            {t.whatWeDoPageTitle || "What We Do"}
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                            {t.whatWeDoPageSubtitle || "Enabling Endless Advantages for Your Financial Freedom"}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 md:py-20 bg-gradient-to-b from-background to-secondary/10 dark:from-background dark:to-secondary/5">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Text Block */}
                        <motion.div
                            className="order-2 md:order-1 backdrop-blur-sm bg-white/10 dark:bg-white/5 rounded-xl p-8 md:p-10 shadow-xl border border-white/20"
                            variants={textContentVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-primary dark:text-primary-foreground leading-tight tracking-tight">
                                {t.whatWeDoTitle || "What we do, we enable Endless Advantages…"}
                            </h2>
                            <motion.ul
                                className="space-y-6 mb-10"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {advantages.map((advantage, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-start text-lg text-foreground/90 dark:text-foreground/80 leading-relaxed"
                                        variants={itemVariants}
                                    >
                                        <CheckCircle2 className="h-6 w-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                                        <span>{advantage.text}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            {/* Call To Action - QR Modal Button */}
                            <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
                                <DialogTrigger asChild>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            size="md"
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                                        >
                                            {t.downloadButton || "Download the App"}
                                        </Button>
                                    </motion.div>
                                </DialogTrigger>

                                <AnimatePresence>
                                    {isQrModalOpen && (
                                        <DialogContent
                                            className="sm:max-w-[425px] bg-slate-800 border-purple-700 text-gray-100"
                                            as={motion.div}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <DialogHeader>
                                                <DialogTitle className="text-purple-400">{t.qrModalTitle || "Scan to Download"}</DialogTitle>
                                                <DialogDescription className="text-gray-400">
                                                    {t.qrModalDescription || "Use your camera to scan the QR code and get the app instantly."}
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="p-6 flex flex-col justify-center items-center bg-slate-700 rounded-lg relative space-y-4">
                                                {isQrLoading ? (
                                                    <motion.div
                                                        className="w-24 h-24 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                    />
                                                ) : (
                                                    <motion.div
                                                        className="p-2 border-4 border-purple-500 rounded-md shadow-xl animate-pulse"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <QRCode
                                                            value="https://your-app-download-link.com"
                                                            size={256}
                                                            bgColor="#1e293b"
                                                            fgColor="#f9fafb"
                                                            level="H"
                                                        />
                                                    </motion.div>
                                                )}

                                                {/* App Store + Play Store buttons */}
                                                <div className="flex flex-col space-y-3 pt-4 w-full">
                                                    <a
                                                        href="https://apps.apple.com"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-gray-900 transition-all duration-300"
                                                    >
                                                        🍎 Download on the App Store
                                                    </a>
                                                    <a
                                                        href="https://play.google.com/store"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition-all duration-300"
                                                    >
                                                        🤖 Get it on Google Play
                                                    </a>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    )}
                                </AnimatePresence>
                            </Dialog>
                        </motion.div>

                        {/* Image Block */}
                        <motion.div
                            className="order-1 md:order-2 w-full lg:w-[85%] mx-auto"
                            variants={imageVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <img
                                className="rounded-2xl shadow-2xl object-contain w-full h-auto transition-transform duration-500 hover:scale-105"
                                alt="Smiling person using a smartphone, representing financial freedom"
                                src={WhatWeDoFinancialFreedomImage}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhatWeDoPage;
