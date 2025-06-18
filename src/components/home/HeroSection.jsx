import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Apple } from "lucide-react";
import HeroBackgroundAnimation from "@/assets/videos/show2.mp4";
import PlaysStoreBadge from "@/assets/images/google-play-badge-rgb.webp";

const HeroSection = ({ t, setIsModalOpen }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Load video after component mount to prevent blocking initial render
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, []);

    return (
        <section id="hero-section" className="relative w-full h-screen min-h-[700px] md:min-h-[800px] overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ willChange: 'transform' }}
                >
                    <source src={HeroBackgroundAnimation} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-between h-full text-center px-4 md:px-6 text-white">
                <div className="flex flex-col items-center justify-center flex-grow pt-20 md:pt-24">
                    <h1 className="hero-title">
                        {t.heroTitle}
                    </h1>

                    <p className="hero-subtitle">
                        {t.heroSubtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        {/* Primary CTA buttons were previously here, now removed or can be re-added if needed */}
                    </div>
                </div>

                <div className="pb-8 md:pb-12 lg:pb-16 w-full flex flex-col items-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-xl sm:text-2xl font-semibold text-gray-200 dark:text-gray-100 my-6"
                    >
                        {t.appPreviewTitle || "Download The Mikaty App On:"}
                    </motion.p>
                    <div className="grid grid-cols-2 gap-3 justify-center items-center w-full max-w-[280px] sm:max-w-[320px] mx-auto">
                        <motion.a
                            href="https://apps.apple.com/app/idXXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-black hover:bg-gray-800 text-white py-2.5 px-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-[48px] w-full"
                            whileHover={{ scale: 1.05, boxShadow: "0px 5px 12px rgba(0,0,0,0.2)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Apple className="h-4 w-4 mr-1.5 text-white shrink-0" />
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
                            whileHover={{ scale: 1.05, boxShadow: "0px 5px 12px rgba(0,0,0,0.2)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <img
                                src={PlaysStoreBadge}
                                alt={t.language === "fr" ? "Télécharger sur Google Play" : "Download on Google Play"}
                                className="h-[80px] w-auto mr-2 shrink-0"
                                loading="lazy"
                                decoding="async"
                                fetchpriority="low"
                                width="80"
                                height="80"
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
                </div>
            </div>
        </section>
    );
};

export default HeroSection;