// noinspection JSUnusedGlobalSymbols

export const pathTranslations = {
  '/': '/accueil',
  '/services': '/services', 
  '/services/personal-accounts': '/services/comptes-personnels',
  '/services/business-solutions': '/services/solutions-entreprises',
  '/services/top-up-mobile-money': '/services/rechargement-mobile',
  '/services/digital-card': '/services/carte-digitale',
  '/services/zero-cost-transfers': '/services/transferts-gratuits',
  '/services/shop-online': '/services/acheter-en-ligne',
  '/services/pay-in-stores': '/services/payer-en-magasin',
  '/services/bill-payments': '/services/factures',
  '/services/bank-transfers-uemoa': '/services/virements-uemoa',
  '/services/competitive-remittance-fees': '/services/frais-de-transfert-reduits',
  '/services/request-money': '/services/demander-de-l-argent',
  '/company': '/entreprise', 
  '/blog': '/blog', 
  '/contact': '/contact', 
  '/register': '/inscription', 
  '/what-we-do': '/ce-que-nous-faisons', 
  '/what-we-can-do': '/ce-que-nous-pouvons-faire', 
  '/support': '/support', 
  '/privacy-policy': '/politique-de-confidentialite',
  '/faq': '/faq', 
  // Assuming /terms-of-service maps to a component, if not, it can be removed.
  // For now, I'll add it based on your list, but there's no Terms of Service page component yet.
  // '/terms-of-service': '/conditions-generales', 
};

export const getLocalizedPath = (path, language) => {
  if (language === 'fr') {
    return pathTranslations[path] || path;
  }
  return path;
};

export const getEnglishPath = (localizedPath, currentLanguage) => {
  if (currentLanguage === 'fr') {
    for (const [enPath, frPath] of Object.entries(pathTranslations)) {
      if (frPath === localizedPath) {
        return enPath;
      }
    }
  }
  return localizedPath; 
};

// noinspection JSUnusedGlobalSymbols
export const allPaths = Object.keys(pathTranslations);
export const allLocalizedPaths = pathTranslations;