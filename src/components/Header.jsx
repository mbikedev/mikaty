import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Zap, Building, MessageSquare, UserPlus, HelpCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import MobileSidebar from "@/components/MobileSidebar";
import Logo from "@/components/header/Logo";
import DesktopNav from "@/components/header/DesktopNav";
import LanguageSwitcher from "@/components/header/LanguageSwitcher";
import ThemeToggle from "@/components/header/ThemeToggle";
import MobileMenuToggle from "@/components/header/MobileMenuToggle";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const { theme, setTheme } = useTheme(); 
  const { language, setLanguage, translations: t, getLocalizedPath } = useLanguage();
  const location = useLocation();
  const headerRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 20);

    if (location.pathname === '/' || location.pathname === getLocalizedPath('/', 'fr')) {
      const heroSection = document.getElementById('hero-section');
      const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsHeroVisible(heroBottom > headerHeight);
      } else {
        setIsHeroVisible(scrollPosition < window.innerHeight - headerHeight); 
      }
    } else {
      setIsHeroVisible(false);
    }
  };

  useEffect(() => {
    handleScroll(); 
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, language]);
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isCurrentPath = (path) => {
    const localizedCurrentPath = location.pathname;
    const targetLocalizedPath = getLocalizedPath(path);
    return localizedCurrentPath === targetLocalizedPath;
  };

  const getNavLinkTextColor = (isActive) => {
    const isHomePage = location.pathname === getLocalizedPath('/', 'en') || location.pathname === getLocalizedPath('/', 'fr');
    if (isHomePage && isHeroVisible && !isScrolled) {
      return isActive ? "text-primary" : "text-white/90 hover:text-white focus:text-white";
    }
    return isActive ? "text-primary" : "text-foreground/80 dark:text-foreground/70 hover:text-primary focus:text-primary";
  };

  const navLinkClasses = (path) => {
    const isActive = isCurrentPath(path);
    const isHomePage = location.pathname === getLocalizedPath('/', 'en') || location.pathname === getLocalizedPath('/', 'fr');
    return `relative font-medium transition-colors duration-300 focus:outline-none focus:underline-offset-4
    ${getNavLinkTextColor(isActive)}
    ${(isHomePage && isHeroVisible && !isScrolled && isActive) ? "focus:underline" : "focus:underline"}
    after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] 
    ${(isHomePage && isHeroVisible && !isScrolled) ? "after:bg-white" : "after:bg-primary"}
    after:transition-all after:duration-300
    ${isActive ? "after:w-full" : ((isHomePage && isHeroVisible && !isScrolled) ? "hover:after:w-full" : "hover:after:w-full")}`;
  };
  
  const navButtonClasses = () => {
    const isHomePage = location.pathname === getLocalizedPath('/', 'en') || location.pathname === getLocalizedPath('/', 'fr');
    return `relative font-medium transition-colors duration-300 focus:outline-none focus:underline-offset-4 
    ${(isHomePage && isHeroVisible && !isScrolled) ? "text-white/90 hover:text-white focus:text-white" : "text-foreground/80 dark:text-foreground/70 hover:text-primary focus:text-primary"}
    after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] 
    ${(isHomePage && isHeroVisible && !isScrolled) ? "after:bg-white" : "after:bg-primary"}
    after:transition-all after:duration-300 hover:after:w-full`;
  };


  const navItems = [
    { labelKey: "navHome", defaultLabel: "Home", path: "/", icon: Home },
    { labelKey: "navServices", defaultLabel: "Services", path: "/services", icon: Zap },
    { labelKey: "navCompany", defaultLabel: "Company", path: "/company", icon: Building },
    { labelKey: "navContact", defaultLabel: "Contact", path: "/contact", icon: MessageSquare },
    { labelKey: "navFAQ", defaultLabel: "FAQ", path: "/faq", icon: HelpCircle },
    { labelKey: "navRegister", defaultLabel: "Register", path: "/register", icon: UserPlus, isButton: true }, 
  ];

  const languageOptions = [
    { code: "en", label: "EN", flag: "/us-flag.svg", fullName: t.languageSwitchToEN || "English" },
    { code: "fr", label: "FR", flag: "/fr-flag.svg", fullName: t.languageSwitchToFR || "Français" },
  ];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode); 
  };

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 15 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  
  const headerBgClass = () => {
    const isHomePage = location.pathname === getLocalizedPath('/', 'en') || location.pathname === getLocalizedPath('/', 'fr');
    if (isScrolled) {
      return "bg-background/95 dark:bg-background/80 backdrop-blur-lg shadow-lg";
    }
    if (isHomePage && isHeroVisible) {
      return "bg-transparent";
    }
    return "bg-background dark:bg-background"; 
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };


  return (
    <>
      <motion.header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass()}`}
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-24">
            <Logo 
              onClick={closeMobileMenu} 
              isHeroVisible={(location.pathname === getLocalizedPath('/', 'en') || location.pathname === getLocalizedPath('/', 'fr')) && isHeroVisible && !isScrolled} 
            />
            <DesktopNav 
              navItems={navItems} 
              navLinkClasses={navLinkClasses} 
              navButtonClasses={navButtonClasses()} 
              t={t} 
              getLocalizedPath={getLocalizedPath}
              isCurrentPath={isCurrentPath}
              isHeroVisible={(location.pathname === getLocalizedPath('/', 'en') || location.pathname === getLocalizedPath('/', 'fr')) && isHeroVisible && !isScrolled}
            />

            <div className="flex items-center space-x-2 md:space-x-3">
              <LanguageSwitcher 
                language={language}
                languageOptions={languageOptions}
                onLanguageChange={handleLanguageChange}
                buttonVariants={buttonVariants}
                isHeroVisible={(location.pathname === getLocalizedPath('/', 'en') || location.pathname === getLocalizedPath('/', 'fr')) && isHeroVisible && !isScrolled}
              />
              <ThemeToggle 
                buttonVariants={buttonVariants}
                isHeroVisible={(location.pathname === getLocalizedPath('/', 'en') || location.pathname === getLocalizedPath('/', 'fr')) && isHeroVisible && !isScrolled}
              />
              
              <MobileMenuToggle 
                isOpen={isMobileMenuOpen} 
                onToggle={toggleMobileMenu} 
                isHeroVisible={(location.pathname === getLocalizedPath('/', 'en') || location.pathname === getLocalizedPath('/', 'fr')) && isHeroVisible && !isScrolled}
              />
            </div>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
              onClick={closeMobileMenu}
            />
            <MobileSidebar 
              isOpen={isMobileMenuOpen}
              onClose={closeMobileMenu}
              navItems={navItems}
              currentPath={location.pathname}
              t={t}
              getLocalizedPath={getLocalizedPath}
              isCurrentPath={isCurrentPath}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;