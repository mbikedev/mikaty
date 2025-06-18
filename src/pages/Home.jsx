import React, {useState} from "react";
import {useLanguage} from "@/context/LanguageContext";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PlansSection from "@/components/home/PlansSection";
import QRCodeModal from "@/components/home/QRCodeModal";
import WhyChooseMikatySection from "@/components/home/WhyChooseMikatySection";
import SubscriptionPaymentsSection from "@/components/home/SubscriptionPaymentsSection";
import SecuritySection from "@/components/home/SecuritySection";
import MoneyManagementSection from "@/components/MoneyManagementSection.jsx";
import CtaSection from "@/components/home/CtaSection.jsx";


const Home = () => {
    const {language, translations: t} = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col">
            <HeroSection t={t} setIsModalOpen={setIsModalOpen}/>
            <FeaturesSection t={t} language={language}/>
            <SubscriptionPaymentsSection t={t} setIsModalOpen={setIsModalOpen}/>
            <SecuritySection/>
            <WhyChooseMikatySection t={t} setIsModalOpen={setIsModalOpen}/>
            <PlansSection t={t}/>
            <MoneyManagementSection/>
            <TestimonialsSection t={t}/>
            <CtaSection t={t}/>
            <QRCodeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                language={language}
            />
        </div>
    );
};

export default Home;