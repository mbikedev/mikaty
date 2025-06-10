// noinspection JSValidateTypes

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ListPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage, translations } from "@/context/LanguageContext";
import RegistrationFormFields from "@/components/register/RegistrationFormFields";
import RegistrationHero from "@/components/register/RegistrationHero";
import MikatCardImage from "@/assets/images/mikat-summit.webp";

const Register = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phoneNumber) {
      toast({
        variant: "destructive",
        title: t.errorTitle || (language === "en" ? "Error" : "Erreur"),
        description:
            t.fillAllFieldsError ||
            (language === "en"
                ? "Please fill in all required fields."
                : "Veuillez remplir tous les champs obligatoires."),
      });
      return false;
    }
    if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phoneNumber)) {
      toast({
        variant: "destructive",
        title: t.errorTitle || (language === "en" ? "Error" : "Erreur"),
        description:
            t.invalidPhoneNumberError ||
            (language === "en"
                ? "Please enter a valid phone number."
                : "Veuillez entrer un num\u00e9ro de t\u00e9l\u00e9phone valide."),
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const existingWaitlist =
            JSON.parse(localStorage.getItem("mikatyWaitingList")) || [];
        const userExists = existingWaitlist.some(
            (user) => user.phoneNumber === formData.phoneNumber
        );

        if (userExists) {
          toast({
            variant: "destructive",
            title:
                t.waitingListErrorTitle ||
                (language === "en" ? "Already on List" : "D\u00e9j\u00e0 sur la liste"),
            description:
                t.waitingListExistsError ||
                (language === "en"
                    ? "This phone number is already on the waiting list."
                    : "Ce num\u00e9ro de t\u00e9l\u00e9phone est d\u00e9j\u00e0 sur la liste d'attente."),
          });
          setIsSubmitting(false);
          return;
        }

        const newUser = {
          ...formData,
          id: Date.now().toString(),
          joinDate: new Date().toISOString(),
        };

        existingWaitlist.push(newUser);
        localStorage.setItem(
            "mikatyWaitingList",
            JSON.stringify(existingWaitlist)
        );

        toast({
          title:
              t.waitingListSuccessTitle ||
              (language === "en" ? "Successfully Joined!" : "Inscription R\u00e9ussie !"),
          description:
              t.waitingListSuccessMessage ||
              (language === "en"
                  ? "You've been added to the Mikaty waiting list. We'll notify you via SMS!"
                  : "Vous avez \u00e9t\u00e9 ajout\u00e9 \u00e0 la liste d'attente Mikaty. Nous vous informerons par SMS !"),
          duration: 5000,
        });
        setFormData({ fullName: "", phoneNumber: "" });
      } catch (error) {
        toast({
          variant: "destructive",
          title:
              t.storageErrorTitle ||
              (language === "en" ? "Storage Error" : "Erreur de Sauvegarde"),
          description:
              t.storageErrorMessage ||
              (language === "en"
                  ? "Could not save your information."
                  : "Impossible de sauvegarder vos informations."),
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
      <>
        <RegistrationHero t={t} pageContext="waitingList" />

        <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-400 opacity-20 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-400 opacity-20 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse"></div>
            <div className="absolute left-10 top-1/4 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 rounded-full blur-2xl animate-blob"></div>
            <div className="absolute right-10 bottom-1/4 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 opacity-10 rounded-full blur-2xl animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative container mx-auto px-4 md:px-6">
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
              <div className="p-8 glass-card rounded-xl shadow-xl bg-white/60 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200 dark:border-slate-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <RegistrationFormFields
                      formData={formData}
                      handleChange={handleChange}
                      t={t}
                      language={language}
                  />
                  <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                      disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                        <span className="flex items-center">
                      <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                      >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                          {t.joiningButtonText ||
                              (language === "en"
                                  ? "Joining..."
                                  : "Inscription en cours...")}
                    </span>
                    ) : (
                        <span className="flex items-center justify-center">
                      <ListPlus className="mr-2 h-5 w-5" />
                          {t.joinWaitingListButton ||
                              (language === "en"
                                  ? "Join Waiting List"
                                  : "Rejoindre la liste d'attente")}
                    </span>
                    )}
                  </Button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                  {t.waitingListInfoText ||
                      (language === "en"
                          ? "We'll notify you via SMS when the app is ready!"
                          : "Nous vous informerons par SMS lorsque l'application sera prête !")}
                </p>
              </div>

              <motion.div
                  className="flex justify-center items-center"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
                  whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.4, ease: "easeOut" } }}
              >
                <img
                    src={MikatCardImage}
                    alt="Mikaty Card"
                    className="w-full max-w-sm rounded-2xl shadow-2xl border-2 border-purple-400 dark:border-purple-600"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </>
  );
};

export default Register;
