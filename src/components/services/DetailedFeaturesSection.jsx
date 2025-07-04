import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Smartphone, CreditCard, Send, ShoppingCart,
  Store, FileText, Landmark, Globe, HelpCircle
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

const DetailedFeaturesSection = () => {
  const { translations: t } = useLanguage();

  const features = [
    { icon: <Smartphone className="h-8 w-8 text-purple-400" />, titleKey: "services_detail_feat1_title", descriptionKey: "services_detail_feat1_desc", link: "/services/top-up-mobile-money" },
    { icon: <CreditCard className="h-8 w-8 text-purple-400" />, titleKey: "services_detail_feat2_title", descriptionKey: "services_detail_feat2_desc", link: "/services/digital-card" },
    { icon: <Send className="h-8 w-8 text-purple-400" />, titleKey: "services_detail_feat3_title", descriptionKey: "services_detail_feat3_desc", link: "/services/zero-cost-transfers" },
    { icon: <ShoppingCart className="h-8 w-8 text-purple-400" />, titleKey: "services_detail_feat4_title", descriptionKey: "services_detail_feat4_desc", link: "/services/shop-online" },
    { icon: <Store className="h-8 w-8 text-purple-400" />, titleKey: "services_detail_feat5_title", descriptionKey: "services_detail_feat5_desc", link: "/services/pay-in-stores" },
    { icon: <FileText className="h-8 w-8 text-purple-400" />, titleKey: "services_detail_feat6_title", descriptionKey: "services_detail_feat6_desc", link: "/services/bill-payments", hidden: true },
    { icon: <Landmark className="h-8 w-8 text-purple-400" />, titleKey: "services_detail_feat7_title", descriptionKey: "services_detail_feat7_desc", link: "/services/bank-transfers-uemoa" },
    { icon: <Globe className="h-8 w-8 text-purple-400" />, titleKey: "services_detail_feat8_title", descriptionKey: "services_detail_feat8_desc", link: "/services/competitive-remittance-fees" },
    { icon: <HelpCircle className="h-8 w-8 text-purple-400" />, titleKey: "services_detail_feat9_title", descriptionKey: "services_detail_feat9_desc", link: "/services/request-money" },
  ];

  // Filter out hidden features
  const visibleFeatures = features.filter(feature => !feature.hidden);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#f4f6ff] to-[#eef1fa] dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 text-transparent bg-clip-text mb-4">
              {t.services_detail_section_title || "Unlock a World of Convenience"}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t.services_detail_section_subtitle || "Mikaty offers a comprehensive suite of features designed to simplify your financial life. Explore what you can do:"}
            </p>
          </motion.div>

          <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
          >
            {visibleFeatures.map((feature, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full mr-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t[feature.titleKey] || feature.titleKey.replace(/_/g, ' ')}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-5">
                    {t[feature.descriptionKey] || feature.descriptionKey.replace(/_/g, ' ')}
                  </p>
                  <Link to={feature.link} className="mt-auto block">
                    <Button variant="outline" className="w-full hover:bg-purple-100 dark:hover:bg-purple-900/30 border-purple-300 dark:border-purple-500 text-purple-700 dark:text-purple-300">
                      {t.services_detail_learn_more_button || "Learn More"}
                    </Button>
                  </Link>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
  );
};

export default DetailedFeaturesSection;
