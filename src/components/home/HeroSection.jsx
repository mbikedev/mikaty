import React from "react";
import {motion} from "framer-motion";
import {Apple} from "lucide-react";
import HeroBackgroundAnimation from "@/assets/videos/show2.mp4";
import PlaysStoreBadge from"@/assets/images/google-play-badge-rgb.webp"
const HeroSection = ({t, setIsModalOpen}) => {
    const textAndButtonVariants = {
        hidden: {opacity: 0, y: 30},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.8, ease: "easeOut", staggerChildren: 0.2}
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: "easeOut"}}
    };

    const storeButtonVariants = {
        hover: {scale: 1.05, boxShadow: "0px 5px 12px rgba(0,0,0,0.2)"},
        tap: {scale: 0.95}
    };

    return (
        <section id="hero-section" className="relative w-full h-screen min-h-[700px] md:min-h-[800px] overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={HeroBackgroundAnimation}/>
                    Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-black/60"></div>
            </div>


            <div
                className="relative z-10 flex flex-col items-center justify-between h-full text-center px-4 md:px-6 text-white">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textAndButtonVariants}
                    className="flex flex-col items-center justify-center flex-grow pt-20 md:pt-24"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 max-w-4xl leading-tight tracking-tight
                       bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent
                       dark:from-white dark:via-gray-200 dark:to-gray-300"
                        style={{textShadow: '0 1px 3px rgba(0,0,0,0.1), 0 0 10px rgba(220, 220, 255, 0.1)'}}
                    >
                        {t.heroTitle}
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg sm:text-xl md:text-2xl font-medium text-gray-200 mb-10 max-w-2xl"
                        style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}
                    >
                        {t.heroSubtitle}
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        {/* Primary CTA buttons were previously here, now removed or can be re-added if needed */}
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textAndButtonVariants}
                    className="pb-8 md:pb-12 lg:pb-16 w-full flex flex-col items-center"
                >
                    <motion.p
                        variants={itemVariants}
                        className="text-xl sm:text-2xl font-semibold text-gray-200 dark:text-gray-100 my-6"
                        style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}
                    >
                        {t.appPreviewTitle || "Download The Mikaty App On:"}
                    </motion.p>
                    <div
                        className="grid grid-cols-2 gap-3 justify-center items-center w-full max-w-[280px] sm:max-w-[320px] mx-auto">
                        <motion.a
                            href="https://apps.apple.com/app/idXXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-black hover:bg-gray-800 text-white py-2.5 px-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-[48px] w-full"
                            variants={storeButtonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Apple className="h-4 w-4 mr-1.5 text-white shrink-0"/>
                            <div className="text-left overflow-hidden">
                                <p className="text-[10px] leading-tight truncate">{t.appPreviewStoreAppleSmallText || "Download on the"}</p>
                                <p className="text-[13px] font-semibold leading-tight truncate">{t.appPreviewStoreAppleLargeText || "App Store"}</p>
                            </div>
                        </motion.a>

                        <motion.a
                            href="https://play.google.com/store/apps/details?id=XXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-start bg-gray-100 hover:bg-gray-200 text-black py-2.5 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-[48px] w-full"
                            variants={storeButtonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <img
                                src={PlaysStoreBadge}
                                alt={t.language === "fr" ? "Télécharger sur Google Play" : "Download on Google Play"}
                                className="h-[80px] w-auto mr-2 shrink-0"
                            />
                            <div className="text-left overflow-hidden">
                                <p className="text-[10px] leading-tight truncate">
                                    {t.language === "fr"
                                        ? t.appPreviewStoreGoogleSmallTextFr || "TÉLÉCHARGER SUR"
                                        : t.appPreviewStoreGoogleSmallText || "GET IT ON"}
                                </p>
                                <p className="text-[13px] font-semibold leading-tight truncate">
                                    {t.language === "fr"
                                        ? t.appPreviewStoreGoogleLargeTextFr || "Google Play"
                                        : t.appPreviewStoreGoogleLargeText || "Google Play"}
                                </p>
                            </div>
                        </motion.a>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;