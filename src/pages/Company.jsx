// noinspection JSXUnresolvedComponent

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PageHero from '@/components/general/PageHero';
import { Button } from '@/components/ui/button';
import { Linkedin, Newspaper, Briefcase, HeartHandshake, Building2, TrendingUp, HeartHandshake as Handshake } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const CompanySectionContent = ({ children }) => {
  return (
    <div className="text-[#E0D8F0] space-y-3 text-base md:text-lg leading-relaxed pt-2">
      {children}
    </div>
  );
};

const Company = () => {
  const { translations: t } = useLanguage();

  const accentColorForIcons = "text-purple-400"; 
  const accentColorForLinks = "text-purple-400";


  const allSectionsData = {
    aboutUs: {
      icon: Building2, 
      title: t.companyAboutUsTitle || "About Us",
      content: <p>{t.companyAboutUsText || "At Mikaty, we’re building the future of financial access in Africa. Our all-in-one app empowers individuals and businesses to send, spend, and manage money with ease — securely, instantly, and affordably."}</p>,
    },
    newsMedia: {
      icon: Newspaper,
      title: t.companyNewsTitle || "News and Media",
      content: <p>{t.companyNewsText || "Stay up to date with Mikaty’s latest milestones, product launches, and media coverage as we drive financial inclusion across the UEMOA region and beyond."}</p>,
    },
    esg: {
      icon: TrendingUp, 
      title: t.companyESGTitle || "ESG",
      content: <p>{t.companyESGText || "Mikaty is committed to responsible innovation. Our ESG efforts focus on financial inclusion, digital literacy, and sustainable growth to create lasting impact in the communities we serve."}</p>,
    },
    careers: {
      icon: Briefcase,
      title: t.companyCareersTitle || "Careers",
      content: (
        <>
          <p>{t.companyCareersText || "We’re on a mission to transform finance — and we’re hiring! Join Mikaty to shape the digital economy of tomorrow while growing your career in a dynamic, purpose-driven environment."}</p>
          <Button asChild variant="link" className={`px-0 ${accentColorForLinks} hover:text-purple-300 text-base md:text-lg`}>
            <a href={t.companyCareersLinkedInUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {t.companyCareersLinkText || "Checkout our LinkedIn Page."} <Linkedin size={18} className="ml-2" />
            </a>
          </Button>
        </>
      ),
    },
    workingAtMikaty: {
      icon: HeartHandshake,
      title: t.companyWorkingAtMikatyTitle || "Working at Mikaty",
      content: <p>{t.companyWorkingAtMikatyText || "At Mikaty, innovation meets impact. We value agility, ownership, and inclusivity. Every team member plays a vital role in shaping products that make a real difference in people’s lives."}</p>,
    },
    culture: {
      icon: Handshake, 
      title: t.companyCultureTitle || "Culture",
      content: <p>{t.companyCultureText || "We believe in bold ideas, open collaboration, and a shared purpose. Our culture is driven by passion, trust, and the will to make finance fairer and simpler for everyone."}</p>,
    },
  };

  const leftColumnKeys = ["aboutUs", "newsMedia", "esg"];
  const rightColumnKeys = ["careers", "workingAtMikaty", "culture"];

  const renderSectionCard = (key, index) => {
    const section = allSectionsData[key];
    if (!section) return null;

    return (
      <div 
        key={key}
        data-aos="fade-up" 
        data-aos-duration="600"
        data-aos-delay={index * 100}
        className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-xl border border-white/10"
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={key} className="border-b-0">
            <AccordionTrigger className="py-3 hover:no-underline group">
              <div className="flex items-center">
                <section.icon className={`w-7 h-7 ${accentColorForIcons} mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110`} />
                <h2 className={`text-xl md:text-2xl font-bold tracking-wide text-white group-hover:text-gray-200 transition-colors text-left`}>{section.title}</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-0 md:pl-2">
              <CompanySectionContent>{section.content}</CompanySectionContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-r from-[#2D0036] to-[#3c0470] text-purple-100 min-h-screen font-sans">
      <PageHero
        title={t.navCompany || "Company"}
        subtitle={t.companyPageSubtitle || "Learn more about our mission, vision, and values."}
        brandName="Mikaty"
        titleClasses="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-purple-400"
        subtitleClasses="text-lg md:text-xl text-purple-200/90 mb-8 max-w-2xl mx-auto"
        heroPatternClass=""
        customPadding="pt-28 pb-0 md:pt-36 md:pb-0"
      />
      
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <img 
          src="https://storage.googleapis.com/hostinger-horizons-assets-prod/d9983a96-d946-4810-b34e-643479ab9517/4d62f2a3f5392b54ec047c4ddc77565f.webp" 
          alt="Mikaty Shield Logo" 
          className="mx-auto my-0 w-full max-w-sm md:max-w-[20rem] rounded-xl shadow-2xl object-contain"
          data-aos="fade-up"
          data-aos-duration="800" 
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <div className="space-y-8 lg:space-y-10">
            {leftColumnKeys.map((key, index) => renderSectionCard(key, index))}
          </div>
          <div className="space-y-8 lg:space-y-10">
            {rightColumnKeys.map((key, index) => renderSectionCard(key, index + leftColumnKeys.length))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;