import React from "react";
import {Link} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useLanguage, translations} from "@/context/LanguageContext";
import {X, ListPlus} from "lucide-react";
import PopUpRegis from "@/assets/images/consult.webp"

const RegistrationPopup = ({isOpen, onClose}) => {
    const {language} = useLanguage();
    const t = translations[language];

    const popupVariants = {
        hidden: {opacity: 0, scale: 0.9, y: 50},
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {type: "spring", stiffness: 300, damping: 30}
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 50,
            transition: {duration: 0.2}
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent
                        as={motion.div}
                        variants={popupVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="sm:max-w-md p-0 overflow-hidden shadow-2xl border-border/50"
                    >
                        <div className="relative">
                            <img
                                src={PopUpRegis}
                                alt="Mikaty Waiting List Promotion"
                                className="w-full h-48 object-cover"
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-3xl font-bold text-white">
                                Mikaty
                            </h2>
                        </div>

                        <div className="p-6">
                            <DialogHeader className="mb-4">
                                <DialogTitle className="text-2xl font-bold gradient-text">
                                    {t.waitingListPopupTitle || "Join Mikaty Waiting List"}
                                </DialogTitle>
                                <DialogDescription className="text-foreground/70 dark:text-foreground/60 mt-2">
                                    {t.waitingListPopupDescription || "Be among the first adopters of the Mikaty app and unlock exclusive benefits and take full control of your finances."}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-3">
                                <Link to="/register" className="block" onClick={onClose}>
                                    <Button className="w-full gradient-bg text-primary-foreground h-12 text-base">
                                        <ListPlus className="mr-2 h-5 w-5"/>
                                        {t.waitingListPopupButton || "Join the waiting list now"}
                                    </Button>
                                </Link>
                                <Button variant="outline" onClick={onClose} className="w-full h-12 text-base">
                                    <X className="mr-2 h-5 w-5"/>
                                    {t.popupMaybeLaterButton || (language === "en" ? "Maybe Later" : "Peut-être Plus Tard")}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default RegistrationPopup;