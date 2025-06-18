import React from "react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import CardsShow from "@/assets/videos/cards-show.mp4"

const AppPreviewSection = ({language, setIsModalOpen}) => {

    const CheckIcon = () => (<svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24"
                                  stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
    </svg>);

    const listItems = [language === "en" ? "Real-time transaction notifications" : "Notifications de transactions en temps réel", language === "en" ? "Automated savings and investment plans" : "Plans d'épargne et d'investissement automatisés", language === "en" ? "Detailed spending analytics and insights" : "Analyses détaillées des dépenses et informations",];
    const textContainerVariants = {
        hidden: {opacity: 0, x: 50, scale: 0.95}, visible: {
            opacity: 1, x: 0, scale: 1, transition: {duration: 0.8, ease: "easeOut", delay: 0.2}
        }
    };

    return (<>
        <section
            className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-[#0f0c1a] dark:via-background dark:to-sky-900/30 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Video on the Left */}
                    <motion.div
                        className="lg:w-1/2"
                        variants={CardsShow}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount: 0.2}}
                    >
                        <motion.div
                            className="bg-card dark:bg-card/70 p-3 sm:p-4 rounded-2xl border border-border/20 dark:border-white/10 overflow-hidden shadow-2xl"
                            animate={{
                                borderColor: [
                                    "rgba(112, 12, 211, 0.2)",
                                    "rgba(112, 12, 211, 0.5)",
                                    "rgba(112, 12, 211, 0.2)"
                                ],
                                boxShadow: [
                                    "0 0 15px 0px rgba(112, 12, 211, 0.1)",
                                    "0 0 25px 5px rgba(112, 12, 211, 0.2)",
                                    "0 0 15px 0px rgba(112, 12, 211, 0.1)"
                                ]
                            }}
                            transition={{
                                duration: 2.5,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "mirror"
                            }}
                        >
                            <div className="w-full h-[400px] rounded-lg overflow-hidden">
                                <video
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                >
                                    <source src={CardsShow} type="video/mp4"/>
                                </video>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        className="lg:w-1/2 lg:pl-8 text-center lg:text-left"
                        variants={textContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount: 0.2}}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground dark:text-white leading-tight mb-6">
                            {language === "en"
                                ? "Manage Your Money with Confidence"
                                : "Gérez Votre Argent en Toute Confiance"}
                        </h2>

                        <p className="text-base md:text-lg leading-relaxed text-foreground/80 dark:text-white/70 max-w-xl mx-auto lg:mx-0 mb-8">
                            {language === "en"
                                ? "Our intuitive app gives you complete control over your finances. Track spending, set savings goals, and make informed decisions about your money."
                                : "Notre application intuitive vous donne un contrôle total sur vos finances. Suivez vos dépenses, fixez des objectifs d'épargne et prenez des décisions éclairées concernant votre argent."}
                        </p>

                        <ul className="space-y-4 mb-10 text-left inline-block">
                            {listItems.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <div
                                        className="mr-3 mt-1 flex-shrink-0 bg-green-100 dark:bg-green-700/30 rounded-full p-1.5 border border-green-300 dark:border-green-600 shadow-sm">
                                        <CheckIcon className="w-4 h-4 text-green-700 dark:text-green-400"/>
                                    </div>
                                    <span className="text-foreground/90 dark:text-white/80 text-base md:text-lg">
                {item}
              </span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                            onClick={() => setIsModalOpen(true)}
                        >
                            {language === "en" ? "Download the App" : "Télécharger l'Application"}
                            <ArrowRight className="ml-2 h-5 w-5"/>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>

    </>);
};

