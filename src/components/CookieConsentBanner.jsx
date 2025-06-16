import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext'; 
import CookieSettingsModal from '@/components/CookieSettingsModal';
import { Cookie, Settings, CheckCircle, XCircle } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'mikaty_cookie_consent_v2';

const CookieConsentBanner = () => {
  const { translations: t } = useLanguage(); 
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ acceptedAll: true, preferences: { necessary: true, performance: true, functional: true, targeting: true }, timestamp: new Date().toISOString() }));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ acceptedAll: false, preferences: { necessary: true, performance: false, functional: false, targeting: false }, timestamp: new Date().toISOString() }));
    setIsVisible(false);
  };

  const handleManageCookies = () => {
    setIsModalOpen(true);
  };

  const handleSavePreferences = (preferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ acceptedAll: false, preferences, timestamp: new Date().toISOString() }));
    setIsVisible(false);
    setIsModalOpen(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl p-4 md:p-6 z-[100]"
          >
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start md:items-center text-sm text-card-foreground/80">
                <Cookie className="h-8 w-8 md:h-6 md:w-6 mr-3 text-primary flex-shrink-0 mt-1 md:mt-0" />
                <p>
                  {t.cookie_consent_message || "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies."}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Button onClick={handleAcceptAll} size="sm" className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {t.cookie_consent_accept_all || "Accept All"}
                </Button>
                <Button onClick={handleRejectAll} size="sm" variant="outline" className="w-full sm:w-auto">
                   <XCircle className="mr-2 h-4 w-4" />
                  {t.cookie_consent_reject_all || "Reject All"}
                </Button>
                <Button onClick={handleManageCookies} size="sm" variant="ghost" className="w-full sm:w-auto">
                  <Settings className="mr-2 h-4 w-4" />
                  {t.cookie_consent_customize || "Customize"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CookieSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePreferences}
        onAcceptAll={handleAcceptAll}
        t={t}
      />
    </>
  );
};

export default CookieConsentBanner;