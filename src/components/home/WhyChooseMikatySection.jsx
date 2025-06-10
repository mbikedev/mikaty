import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Smile,
  CreditCard,
  Send,
  Banknote,
  Wallet,
  ArrowRightLeft,
  Lock,
  PiggyBank
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import QRCode from "react-qr-code";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const FeatureCard = ({ icon, title, description, delay }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
  };

  return (
      <motion.div
          className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center border border-border/10 h-full"
          variants={cardVariants}
      >
        <div className="p-3 bg-primary/10 dark:bg-purple-900/60 rounded-full mb-4">
          {React.cloneElement(icon, { className: "h-7 w-7 text-primary dark:text-purple-300" })}
        </div>
        <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
        {description && <p className="text-sm text-foreground/70">{description}</p>}
      </motion.div>
  );
};

const ActionButton = ({ label, icon, delay }) => {
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay, type: "spring", stiffness: 100 },
    },
    hover: { scale: 1.05, backgroundColor: "hsl(var(--primary-darker))", transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Button
            variant="default"
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-md hover:shadow-lg transition-all duration-300 py-3 px-4 text-sm md:text-base flex items-center gap-2 justify-center"
        >
          {React.cloneElement(icon, { className: "h-5 w-5" })}
          {label}
        </Button>
      </motion.div>
  );
};

const WhyChooseMikatySection = ({ t }) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const headingContentVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const featureCards = [
    { icon: <Zap />, titleKey: "whyChooseMikatyFeature1TitleNew", descKey: "whyChooseCard1Desc" },
    { icon: <ShieldCheck />, titleKey: "whyChooseMikatyFeature2TitleNew", descKey: "whyChooseCard2Desc" },
    { icon: <Smile />, titleKey: "whyChooseMikatyFeature3TitleNew", descKey: "whyChooseCard3Desc" },
    { icon: <CreditCard />, titleKey: "whyChooseMikatyFeature4TitleUpdated", descKey: "whyChooseCard4Desc" },
  ];

  const actionButtons = [
    { labelKey: "whyChooseMikatyService1", icon: <Send /> },
    { labelKey: "whyChooseMikatyService2", icon: <Banknote /> },
    { labelKey: "whyChooseMikatyService3", icon: <Wallet /> },
    { labelKey: "whyChooseMikatyService4", icon: <ArrowRightLeft /> },
    { labelKey: "whyChooseMikatyService5", icon: <Lock /> },
    { labelKey: "whyChooseMikatyService6", icon: <PiggyBank /> },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQrLoading, setIsQrLoading] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      setIsQrLoading(true);

      const loadingTimer = setTimeout(() => {
        setIsQrLoading(false);
      }, 1000); // 1s loading

      const autoCloseTimer = setTimeout(() => {
        setIsModalOpen(false);
      }, 8000); // auto-close after 8s

      return () => {
        clearTimeout(loadingTimer);
        clearTimeout(autoCloseTimer);
      };
    }
  }, [isModalOpen]);

  return (
      <section className="py-16 md:py-24 bg-secondary/30 dark:bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
              className="text-center mb-12 md:mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
          >
            <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
                variants={headingContentVariants}
            >
              {t.whyChooseTitle || "Why Choose Mikaty?"}
            </motion.h2>

            {/* QR Modal Button */}
            <motion.div variants={headingContentVariants} className="mb-6">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        size="lg"
                        className={cn(
                            "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white dark:from-blue-400 dark:to-indigo-500 dark:hover:from-blue-500 dark:hover:to-indigo-600",
                            "px-10 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        )}
                    >
                      {t.tryMikatyNowButton || "Try Mikaty Now"}
                    </Button>
                  </motion.div>
                </DialogTrigger>

                <AnimatePresence>
                  {isModalOpen && (
                      <DialogContent
                          className="sm:max-w-[425px] bg-slate-800 border-blue-700 text-gray-100"
                          as={motion.div}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                      >
                        <DialogHeader>
                          <DialogTitle className="text-blue-400">{t.qrModalTitle || "Scan to Download"}</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            {t.qrModalDescription || "Use your camera to scan the QR code and get the app instantly."}
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

            <motion.p
                className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto whitespace-pre-line"
                variants={headingContentVariants}
            >
              {t.whyChooseMikatySubtitleNew ||
                  "Mikaty helps you spend, send, and save smarter. \nWelcome to your new favourite way; Do it better and cheaper."}
            </motion.p>
          </motion.div>

          <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
          >
            {featureCards.map((card, index) => (
                <FeatureCard
                    key={index}
                    icon={card.icon}
                    title={t[card.titleKey]}
                    description={t[card.descKey]}
                    delay={index * 0.15}
                />
            ))}
          </motion.div>

          <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
          >
            {actionButtons.map((button, index) => (
                <ActionButton
                    key={index}
                    label={t[button.labelKey]}
                    icon={button.icon}
                    delay={index * 0.1}
                />
            ))}
          </motion.div>
        </div>
      </section>
  );
};

export default WhyChooseMikatySection;
