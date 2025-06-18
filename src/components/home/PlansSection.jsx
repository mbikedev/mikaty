import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import GuaranteedDialog from "@/components/GuaranteedDialog"; // Adjust the path if needed

const plans = [
  {
    icon: <CreditCard />,
    titleKey: "planStandardTitle",
    descriptionKey: "planStandardDescription",
    price: 0
  },
  {
    icon: <ShieldCheck />,
    titleKey: "planPlusTitle",
    descriptionKey: "planPlusDescription",
    price: 4990
  }
];

const PlanCard = ({ icon, title, description, price, t, onSubscribe }) => (
    <motion.div
        className="bg-gradient-to-b from-purple-950 to-purple-900 text-white p-6 rounded-2xl shadow-lg border border-white/10 hover:scale-105 transition-transform duration-300 flex flex-col"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mb-4 flex items-center space-x-3">
        <div className="p-3 bg-white/10 rounded-full">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-lg font-bold text-purple-300 mb-4">
        {price > 0 ? `${price.toLocaleString()} FCFA/${t.billingMonth}` : t.freePlan}
      </p>
      <ul className="text-sm space-y-2 pl-4 list-disc text-white/90 mb-6 flex-1">
        {description.map((item, idx) => (
            <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              {item}
            </motion.li>
        ))}
      </ul>
      <Button
          type="button"
          className="w-full bg-primary hover:bg-primary/80 text-white mt-auto"
          onClick={onSubscribe}
      >
        {t.subscribeNow || "Subscribe Now"}
      </Button>
    </motion.div>
);

const PlansSection = () => {
  const { language } = useLanguage();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const translations = {
    en: {
      heading: "Choose Your Plan",
      billingMonth: "month",
      freePlan: "Free Plan",
      subscribeNow: "Subscribe Now",
      qrModalTitle: "Scan to Subscribe",
      qrModalDescription: "Use your camera to scan the QR code and subscribe instantly.",
      planStandardTitle: "Standard: 0 FCA",
      planStandardDescription: [
        "Free Digital Card",
        "Client Support",
        "Additional interchange fees may apply for your e-commerce purchases",
        "Fixed cost of 400 FCFA per transaction for your e-commerce purchases",
        "Additional interchange fees may apply again for your e-commerce purchases",
        "Fees may apply for transfers within the UEMOA zone",
        "Bill payments (water, electricity, etc.)"
      ],
      planPlusTitle: "Mikaty Plus: XX FCA/month",
      planPlusDescription: [
        "Free Digital Card",
        "Priority Client Support",
        "0 FCFA for your e-commerce purchases",
        "Interchange fees may apply",
        "0 FCFA for bank transfers across the entire UEMOA zone",
        "IBAN included",
        "Safe or savings account",
        "Bill payments (water, electricity, etc.)"
      ]
    },
    fr: {
      heading: "Choisissez votre plan",
      billingMonth: "mois",
      freePlan: "Gratuit",
      subscribeNow: "Souscrire maintenant",
      qrModalTitle: "Scannez pour souscrire",
      qrModalDescription: "Utilisez votre caméra pour scanner le QR code et souscrire instantanément.",
      planStandardTitle: "Standard : 0 FCA",
      planStandardDescription: [
        "Carte Digitale gratuite",
        "Support Client",
        "Des frais supplémentaires d’interchange peuvent s’appliquer pour vos achats sur les sites de e-commerce",
        "Coût fixe de 400 FCFA par transaction pour vos achats sur les sites de e-commerce",
        "Des frais supplémentaires d’interchange peuvent s’appliquer pour vos achats sur les sites de e-commerce",
        "Des frais peuvent s’appliquer  pour vos virements sur la zone UEMOA",
        "Paiement de vos factures (eau, électricité,..)"
      ],
      planPlusTitle: "Mikaty Plus : XX FCA/mois",
      planPlusDescription: [
        "Carte Digitale gratuite",
        "Support Client prioritaire",
        "FCFA pour vos achats sur les sites de e-commerce",
        "Des frais d’interchange peuvent s’appliquer",
        "0 FCF sur vos virements bancaires sur toute la zone UEMOA",
        "IBAN inclus",
        "Coffre ou Compte d’épargne",
        "Paiement de vos factures (eau, électricité..)"
      ]
    }
  };

  const t = translations[language] || translations.fr;

  return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2
              className="text-4xl md:text-5xl font-bold text-center text-black dark:text-white mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
          >
            {t.heading}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {plans.map((plan, idx) => (
                <PlanCard
                    key={idx}
                    icon={plan.icon}
                    title={t[plan.titleKey]}
                    description={t[plan.descriptionKey]}
                    price={plan.price}
                    t={t}
                    onSubscribe={() => setIsQrModalOpen(true)}
                />
            ))}
          </div>

          <GuaranteedDialog
              open={isQrModalOpen}
              onOpenChange={setIsQrModalOpen}
              title={t.qrModalTitle}
              description={t.qrModalDescription}
          >
            <img
                alt="QR Code"
                className="w-64 h-64 border-4 border-purple-500 rounded-md shadow-xl"
                src="https://images.unsplash.com/photo-1626682561113-d1db402cc866"
            />
          </GuaranteedDialog>
        </div>
      </section>
  );
};

export default PlansSection;
