import { allLocalizedPaths } from "./route_utils.js";

const BASE_URL = "https://mikaty.com";

const generateSitemap = () => {
  const routes = [
    "/",
    "/services",
    "/services/personal-accounts",
    "/services/business-solutions",
    "/services/top-up-mobile-money",
    "/services/digital-card",
    "/services/zero-cost-transfers",
    "/services/shop-online",
    "/services/pay-in-stores",
    "/services/bill-payments",
    "/services/bank-transfers-uemoa",
    "/services/competitive-remittance-fees",
    "/services/request-money",
    "/company",
    "/contact",
    "/register",
    "/what-we-do",
    "/what-we-can-do",
    "/support",
    "/privacy-policy",
    "/faq",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${routes
    .map((route) => {
      const frPath = allLocalizedPaths[route];
      return `
    <url>
      <loc>${BASE_URL}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${route === "/" ? "1.0" : "0.8"}</priority>
      ${frPath
        ? `<xhtml:link rel="alternate" hreflang="fr" href="${BASE_URL}${frPath}" />
       <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${route}" />`
        : ""}
    </url>`;
    })
    .join("")}
</urlset>`;

  return sitemap;
};

export default generateSitemap; 