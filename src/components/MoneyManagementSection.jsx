import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CardsShow from "@/assets/videos/cards-show.mp4";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import QRCode from "react-qr-code";
import { useLanguage } from '@/context/LanguageContext';

const MoneyManagementSection = () => {
    const { translations: t } = useLanguage();
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
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] },
        },
    };

    const features = [
        t.moneyFeature1 || "Real-time expense tracking",
        t.moneyFeature2 || "Customizable savings plans",
        t.moneyFeature3 || "Secure transactions",
    ];

    return (
        <motion.section
            className="py-16 px-4 md:py-24 md:px-8 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-800 text-gray-100 overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl">
                {/* Text Content */}
                <motion.div
                    variants={itemVariants}
                    className="text-center md:text-left order-2 lg:order-1"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                            {t.moneyTitle || "Manage Your Money with Confidence"}
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                        {t.moneySubtitle || "Our intuitive app gives you complete control over your finances. Track spending, set savings goals, and make informed decisions about your money."}
                    </p>

                    <ul className="space-y-3 mb-10 max-w-md mx-auto md:mx-0">
                        {features.map((item, index) => (
                            <motion.li
                                key={index}
                                className="flex items-center justify-center md:justify-start text-gray-200"
                                custom={index}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: (i) => ({
                                        opacity: 1,
                                        x: 0,
                                        transition: { delay: 0.3 + i * 0.15, duration: 0.5 },
                                    }),
                                }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                                <span className="text-md">{item}</span>
                            </motion.li>
                        ))}
                    </ul>

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

                {/* Video Block */}
                <motion.div
                    className="relative glass-card p-0 md:p-0 rounded-xl shadow-2xl w-full h-full order-1 lg:order-2"
                    variants={imageVariants}
                >
                    <div className="w-full h-full aspect-video rounded-lg overflow-hidden">
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source src={CardsShow} type="video/mp4" />
                        </video>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default MoneyManagementSection;
