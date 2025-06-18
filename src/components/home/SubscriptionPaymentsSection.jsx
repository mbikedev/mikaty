import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import EcoCard from "@/assets/images/eco-card.webp";
import QRCode from "react-qr-code";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

const SubscriptionPaymentsSection = ({ t }) => {
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [isQrLoading, setIsQrLoading] = useState(true);

    useEffect(() => {
        if (isQrModalOpen) {
            setIsQrLoading(true);

            const loadingTimer = setTimeout(() => {
                setIsQrLoading(false);
            }, 1000);

            const autoCloseTimer = setTimeout(() => {
                setIsQrModalOpen(false);
            }, 8000);

            return () => {
                clearTimeout(loadingTimer);
                clearTimeout(autoCloseTimer);
            };
        }
    }, [isQrModalOpen]);

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
    };

    const imageContainerVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1 } },
    };

    const imagePulseAnimation = {
        scale: [1, 1.03, 1],
        transition: {
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror"
        }
    };

    return (
        <motion.section
            className="py-20 md:py-28 bg-gradient-to-r from-sky-400 to-blue-600 dark:from-sky-700 dark:to-blue-900 overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Image */}
                    <motion.div
                        className="lg:w-1/2 relative order-2 lg:order-1"
                        variants={imageContainerVariants}
                    >
                        <div className="relative max-w-sm mx-auto lg:max-w-md">
                            <motion.img
                                src={EcoCard}
                                alt="Mikaty Visa card for online subscriptions and payments"
                                className="rounded-2xl shadow-2xl w-full"
                                animate={imagePulseAnimation}
                            />
                        </div>
                    </motion.div>

                    {/* Text + Button */}
                    <motion.div
                        className="lg:w-1/2 text-white order-1 lg:order-2 text-center lg:text-left"
                        variants={textVariants}
                    >
                        <div className="inline-block bg-white/20 dark:bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                            {t.subscriptionSectionTagline || "VIRTUAL CARDS | 0 FCFA PER CARD"}
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                            {t.subscriptionSectionTitleNew ||
                                "Mikaty, a proudly homegrown Senegalese fintech, is the first to launch a digital card with a comprehensive suite of services — including seamless contactless payments."}
                        </h2>
                        <p className="text-lg md:text-xl opacity-90 mb-8">
                            {t.subscriptionSectionDescriptionNew ||
                                "Get combined Virtual & Digital cards instantly and securely for all your online payments. No hidden fees, full control."}
                        </p>

                        {/* QR Modal Button */}
                        <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
                            <DialogTrigger asChild>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="outline"
                                        className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-slate-100 dark:text-blue-700 dark:hover:bg-slate-200 border-none px-8 py-3 h-auto text-base md:text-lg group"
                                    >
                                        {t.learnMore || "Learn More"}
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Button>
                                </motion.div>
                            </DialogTrigger>

                            <AnimatePresence>
                                {isQrModalOpen && (
                                    <DialogContent
                                        className="sm:max-w-[425px] bg-slate-800 border-blue-700 text-gray-100"
                                        as={motion.div}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <DialogHeader>
                                            <DialogTitle className="text-blue-400">
                                                {t.qrModalTitle || "Scan to Learn More"}
                                            </DialogTitle>
                                            <DialogDescription className="text-gray-400">
                                                {t.qrModalDescription ||
                                                    "Use your camera to scan the QR code and learn more instantly."}
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="p-6 flex flex-col justify-center items-center bg-slate-700 rounded-lg relative space-y-4">
                                            {isQrLoading ? (
                                                <motion.div
                                                    className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                            ) : (
                                                <motion.div
                                                    className="p-2 border-4 border-blue-500 rounded-md shadow-xl animate-pulse"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <QRCode
                                                        value="https://your-app-learn-more-link.com"
                                                        size={256}
                                                        bgColor="#1e293b"
                                                        fgColor="#f9fafb"
                                                        level="H"
                                                    />
                                                </motion.div>
                                            )}

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
                </div>
            </div>
        </motion.section>
    );
};

export default SubscriptionPaymentsSection;
