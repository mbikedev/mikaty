// noinspection JSXUnresolvedComponent,JSUnresolvedReference

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, Briefcase, Layers, ShieldCheck, HelpCircle, Home as HomeIcon, Settings2, Youtube, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import MikatyLogoFooter from "@/assets/images/footer-logo-trans2.webp";

const XLogo = ({ size = 20, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const {translations: t, getLocalizedPath } = useLanguage();
  const currentYear = new Date().getFullYear();



  const socialIconTapAnimation = {
    scale: 1.15,
    transition: { duration: 0.2 }
  };

  const footerLinks = {
    quickLinks: [
      { labelKey: "navHome", defaultLabel: "Home", path: "/", icon: HomeIcon },
      { labelKey: "navServices", defaultLabel: "Services", path: "/services", icon: Settings2 },
      { labelKey: "navCompany", defaultLabel: "Company", path: "/company", icon: Briefcase },
      { labelKey: "navContact", defaultLabel: "Contact", path: "/contact", icon: Mail },
    ],
    services: [
      { labelKey: "whatWeDoPageLinkText", defaultLabel: "What We Do", path: "/what-we-do", icon: Briefcase },
      { labelKey: "whatWeCanDoPageLinkText", defaultLabel: "What We Can Do", path: "/what-we-can-do", icon: Layers },
      { labelKey: "contactSupport", defaultLabel: "Contact Support", path: "/support", icon: Mail },
      { labelKey: "navPrivacyPolicy", defaultLabel: "Privacy Policy", path: "/privacy-policy", icon: ShieldCheck },
      { labelKey: "footerFAQ", defaultLabel: "FAQ", path: "/faq", icon: HelpCircle },
    ],
  };

  const renderSocialIcons = () => (
    <div className="flex space-x-5 justify-center">
      <motion.a
        href="https://facebook.com/mikaty"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.footer_social_facebook || "Mikaty on Facebook"}
        className="text-gray-400 hover:text-white transition-colors"
        whileTap={socialIconTapAnimation}
      >
        <Facebook size={20} />
      </motion.a>
      <motion.a
        href="https://x.com/mikaty"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.footer_social_twitter || "Mikaty on X"}
        className="text-gray-400 hover:text-white transition-colors"
        whileTap={socialIconTapAnimation}
      >
        <XLogo size={20} />
      </motion.a>
      <motion.a
        href="https://instagram.com/mikaty"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.footer_social_instagram || "Mikaty on Instagram"}
        className="text-gray-400 hover:text-white transition-colors"
        whileTap={socialIconTapAnimation}
      >
        <Instagram size={20} />
      </motion.a>
      <motion.a
        href="https://linkedin.com/company/mikaty"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.footer_social_linkedin || "Mikaty on LinkedIn"}
        className="text-gray-400 hover:text-white transition-colors"
        whileTap={socialIconTapAnimation}
      >
        <Linkedin size={20} />
      </motion.a>
      <motion.a
        href="https://youtube.com/@mikaty"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.footer_social_youtube || "Mikaty on YouTube"}
        className="text-gray-400 hover:text-red-500 transition-colors"
        whileTap={socialIconTapAnimation}
      >
        <Youtube size={20} />
      </motion.a>
    </div>
  );

  // noinspection JSUnresolvedReference
    return (
    <footer style={{ backgroundColor: "#210233" }} className="text-gray-300 pt-0 md:pt-0 lg:pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">

              <div className="flex flex-col items-center w-full lg:items-start">
                  <Link to={getLocalizedPath("/")} className="block w-auto mx-auto lg:mx-0">
                      <motion.img
                          src={MikatyLogoFooter}
                          alt="Mikaty Logo"
                          className="w-[140px] md:w-[160px] lg:w-[180px] h-auto mb-2"
                          initial={{opacity: 0, y: -10}}
                          animate={{opacity: 1, y: 0}}
                          transition={{duration: 0.6, ease: "easeOut"}}
                          whileHover={{scale: 1.08}}
                      />
                  </Link>
              </div>


              <div className="lg:col-span-1 text-center lg:text-left">
                  <p className="text-gray-400 text-sm mb-1">
                      {currentYear} MIKATY SA<br/>
                      {t.footerAllRightsReserved || "All Rights reserved."}
                  </p>
                  <p className="text-gray-400 text-xs mb-4">
                      {t.footerBCEAOText || "MIKATY SN SA is registered under the identifier EP.SN.002/2025, on the list of payment institutions maintained by the BCEAO (Central Bank of West African States)."}
                  </p>
                  <p className="text-gray-400 text-sm">{t.footerDescription || "Mikaty is your trusted partner for modern, secure, and intelligent financial solutions."}</p>
              </div>

              <div className="lg:col-span-1 text-center lg:text-left">
                  <span
                      className="text-lg font-semibold mb-4 block text-white">{t.footerQuickLinks || "Quick Links"}</span>
                  <ul className="space-y-3">
                      {footerLinks.quickLinks.map(link => (
                          <li key={link.path}>
                              <Link to={getLocalizedPath(link.path)} className="footer-link-custom text-gray-400">
                                  {link.icon &&
                                      <link.icon size={16}
                                                 className="inline mr-1 mb-0.5"/>} {t[link.labelKey] || link.defaultLabel}
                              </Link>
                          </li>
                      ))}
                  </ul>
              </div>

              <div className="lg:col-span-1 text-center lg:text-left">
                  <span
                      className="text-lg font-semibold mb-4 block text-white">{t.footerServicesTitle || "Services"}</span>
                  <ul className="space-y-3">
                      {footerLinks.services.map(link => (
                          <li key={link.path}>
                              <Link to={getLocalizedPath(link.path)} className="footer-link-custom text-gray-400">
                                  {link.icon &&
                                      <link.icon size={16}
                                                 className="inline mr-1 mb-0.5"/>} {t[link.labelKey] || link.defaultLabel}
                              </Link>
                          </li>
                      ))}
                  </ul>
              </div>

              <div className="lg:col-span-1 text-center lg:text-left">
                  <span
                      className="text-lg font-semibold mb-4 block text-white">{t.footerContactInfo || "Contact Us"}</span>
                  <ul className="space-y-3 text-sm">
                      <li className="flex items-start justify-center lg:justify-start">
                          <Mail size={18} className="mr-3 mt-1 text-gray-400 flex-shrink-0"/>
                          <a href="mailto:support@mikaty.com"
                             className="text-gray-400 hover:text-white transition-colors">
                              {t.footerSupportEmailNew || "support@mikaty.com"}
                          </a>
                      </li>
                      <li className="flex items-start justify-center lg:justify-start">
                          <Phone size={18} className="mr-3 mt-1 text-gray-400 flex-shrink-0"/>
                          <span className="text-gray-400">{t.footerPhoneNumber || "+221 77 123 45 67"}</span>
                      </li>
                      <li className="flex items-start justify-center lg:justify-start">
                          <MapPin size={18} className="mr-3 mt-1 text-gray-400 flex-shrink-0"/>
                          <span className="text-gray-400">{t.footerAddress || "Dakar, Senegal"}</span>
                      </li>
                  </ul>
              </div>
          </div>

          <div className="mt-10 lg:mt-6">
              {renderSocialIcons()}
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
              <p className="mb-1">{t.footerSiteDesign || "Site design by Mbagnick Gaye"}</p>
              <p>{t.footerSitePoweredBy || "Site powered by Mikaty SN SA."}</p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;