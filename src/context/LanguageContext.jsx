// noinspection JSCheckFunctionSignatures,JSUnusedGlobalSymbols

import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { enTranslations, frTranslations } from "@/context/translations/index.js";
import { getLocalizedPath, getEnglishPath } from "@/lib/route_utils.js";

const LanguageContext = createContext();

// noinspection JSUnusedGlobalSymbols
export const LanguageProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    const browserLanguage = navigator.language.split('-')[0];
    return savedLanguage || (browserLanguage === 'fr' ? 'fr' : 'en');
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    
    const currentEnglishPath = getEnglishPath(location.pathname, language === 'en' ? 'fr' : 'en');
    const newLocalizedPath = getLocalizedPath(currentEnglishPath, language);

    if (location.pathname !== newLocalizedPath) {
      navigate(newLocalizedPath, { replace: true });
    }
  }, [language, location.pathname, navigate]);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === "en" ? "fr" : "en"));
  };
  
  const setLanguageAndNavigate = (langCode) => {
    const currentEnglishPath = getEnglishPath(location.pathname, language);
    const newPathForNewLang = getLocalizedPath(currentEnglishPath, langCode);
    setLanguage(langCode);
    if (location.pathname !== newPathForNewLang) {
      navigate(newPathForNewLang, { replace: true });
    }
  };


  const currentTranslations = language === "en" ? enTranslations : frTranslations;

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: setLanguageAndNavigate, // Use this for language switcher
      toggleLanguage, // Kept for other potential uses, but setLanguageAndNavigate is preferred for switcher
      translations: currentTranslations,
      getLocalizedPath: (path) => getLocalizedPath(path, language),
      getEnglishPath: (path) => getEnglishPath(path, language)
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const translations = {
  en: enTranslations,
  fr: frTranslations,
};