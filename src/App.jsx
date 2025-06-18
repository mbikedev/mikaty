import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from 'react-hot-toast';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Company from "@/pages/Company";
import ContactInquiry from "@/pages/ContactInquiry";
import Register from "@/pages/Register";
import WhatWeDoPage from "@/pages/WhatWeDoPage.jsx";
import WhatWeCanDo from "@/pages/WhatWeCanDo.jsx";
import Support from "@/pages/Support";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import FAQ from "@/pages/FAQ";
import PersonalAccounts from "@/pages/PersonalAccounts";
import BusinessSolutions from "@/pages/BusinessSolutions";
import TopUpMobileMoney from "@/pages/services/TopUpMobileMoney";
import DigitalCard from "@/pages/services/DigitalCard";
import ZeroCostTransfers from "@/pages/services/ZeroCostTransfers";
import ShopOnline from "@/pages/services/ShopOnline";
import PayInStores from "@/pages/services/PayInStores";
import BillPayments from "@/pages/services/BillPayments";
import BankTransfersUEMOA from "@/pages/services/BankTransfersUEMOA";
import CompetitiveRemittanceFees from "@/pages/services/CompetitiveRemittanceFees";
import RequestMoney from "@/pages/services/RequestMoney";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import RegistrationPopup from "@/components/general/RegistrationPopup";
import FAQModal from "@/components/general/FAQModal";
import FloatingChatPrompt from "@/components/general/FloatingChatPrompt";
import ScrollToTop from "@/components/ScrollToTop";
import { allLocalizedPaths } from "@/lib/route_utils.js";
import { Helmet } from "react-helmet-async";

const AppRoutes = () => {
  const pages = [
    { path: "/", frPath: allLocalizedPaths["/"], component: Home },
    { path: "/services", frPath: allLocalizedPaths["/services"], component: Services },
    { path: "/services/personal-accounts", frPath: allLocalizedPaths["/services/personal-accounts"], component: PersonalAccounts },
    { path: "/services/business-solutions", frPath: allLocalizedPaths["/services/business-solutions"], component: BusinessSolutions },
    { path: "/services/top-up-mobile-money", frPath: allLocalizedPaths["/services/top-up-mobile-money"], component: TopUpMobileMoney },
    { path: "/services/digital-card", frPath: allLocalizedPaths["/services/digital-card"], component: DigitalCard },
    { path: "/services/zero-cost-transfers", frPath: allLocalizedPaths["/services/zero-cost-transfers"], component: ZeroCostTransfers },
    { path: "/services/shop-online", frPath: allLocalizedPaths["/services/shop-online"], component: ShopOnline },
    { path: "/services/pay-in-stores", frPath: allLocalizedPaths["/services/pay-in-stores"], component: PayInStores },
    { path: "/services/bill-payments", frPath: allLocalizedPaths["/services/bill-payments"], component: BillPayments },
    { path: "/services/bank-transfers-uemoa", frPath: allLocalizedPaths["/services/bank-transfers-uemoa"], component: BankTransfersUEMOA },
    { path: "/services/competitive-remittance-fees", frPath: allLocalizedPaths["/services/competitive-remittance-fees"], component: CompetitiveRemittanceFees },
    { path: "/services/request-money", frPath: allLocalizedPaths["/services/request-money"], component: RequestMoney },
    { path: "/company", frPath: allLocalizedPaths["/company"], component: Company },
    { path: "/contact", frPath: allLocalizedPaths["/contact"], component: ContactInquiry },
    { path: "/register", frPath: allLocalizedPaths["/register"], component: Register },
    { path: "/what-we-do", frPath: allLocalizedPaths["/what-we-do"], component: WhatWeDoPage },
    { path: "/what-we-can-do", frPath: allLocalizedPaths["/what-we-can-do"], component: WhatWeCanDo },
    { path: "/support", frPath: allLocalizedPaths["/support"], component: Support },
    { path: "/privacy-policy", frPath: allLocalizedPaths["/privacy-policy"], component: PrivacyPolicy },
    { path: "/faq", frPath: allLocalizedPaths["/faq"], component: FAQ },
  ];

  return (
    <Routes>
      {pages.map(page => (
        <React.Fragment key={page.path}>
          <Route path={page.path} element={React.createElement(page.component)} />
          {page.frPath && page.frPath !== page.path && (
            <Route path={page.frPath} element={React.createElement(page.component)} />
          )}
        </React.Fragment>
      ))}
    </Routes>
  );
};

function App() {
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  useEffect(() => {
    const popupShown = sessionStorage.getItem("mikatyRegistrationPopupShown");
    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowRegistrationPopup(true);
        sessionStorage.setItem("mikatyRegistrationPopupShown", "true");
      }, 20000); 
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenChatModal = () => {
    setIsChatModalOpen(true);
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="mikaty-theme">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LanguageProvider>
          <Helmet>
            <html lang="en" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="canonical" href="https://mikaty.com" />
            <link rel="alternate" hrefLang="en" href="https://mikaty.com" />
            <link rel="alternate" hrefLang="fr" href="https://mikaty.com/fr" />
            <link rel="alternate" hrefLang="x-default" href="https://mikaty.com" />
          </Helmet>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow" role="main">
              <AppRoutes />
            </main>
            <Footer />
          </div>
          <Toaster />
          <HotToaster position="top-right" />
          <ScrollToTopButton />
          <CookieConsentBanner />
          <RegistrationPopup 
            isOpen={showRegistrationPopup} 
            onClose={() => setShowRegistrationPopup(false)} 
          />
          <FAQModal 
            isOpen={isChatModalOpen}
            onOpenChange={setIsChatModalOpen}
          />
          <FloatingChatPrompt onOpenChat={handleOpenChatModal} />
        </LanguageProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;