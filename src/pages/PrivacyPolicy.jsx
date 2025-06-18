import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail } from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";

const PrivacyPolicy = () => {
  const { language, translations: t } = useLanguage();

  const content = {
    title: t.newPrivacyPolicyTitle || "Privacy Policy",
    lastUpdated: t.newPrivacyPolicyLastUpdated || "Last updated: May 19, 2025",
    intro: t.newPrivacyPolicyIntro || "At Mikaty, accessible from https://www.mikaty.com, protecting your personal data is a priority. This privacy policy explains how we collect, use, share, and protect your information.",
    sections: [
      {
        title: t.newPrivacyPolicyS1Title || "1. Who are we?",
        content: [
          t.newPrivacyPolicyS1P1 || "The site https://www.mikaty.com is operated by Mikaty, a platform dedicated to digital financial services (virtual cards, transfers, etc.)."
        ]
      },
      {
        title: t.newPrivacyPolicyS2Title || "2. Data collected",
        content: [
          t.newPrivacyPolicyS2P1 || "When you use our site, we may collect the following data:",
          {
            type: 'list',
            items: [
              t.newPrivacyPolicyS2Li1 || "Identity information: last name, first name, email address, phone number",
              t.newPrivacyPolicyS2Li2 || "Connection data: IP address, browser type, pages visited",
              t.newPrivacyPolicyS2Li3 || "Financial data: only if you subscribe to our services (secure payment)",
              t.newPrivacyPolicyS2Li4 || "Location data (if you have consented)"
            ]
          }
        ]
      },
      {
        title: t.newPrivacyPolicyS3Title || "3. Use of data",
        content: [
          t.newPrivacyPolicyS3P1 || "We use your data to:",
          {
            type: 'list',
            items: [
              t.newPrivacyPolicyS3Li1 || "Create and manage your user account",
              t.newPrivacyPolicyS3Li2 || "Provide the requested services (e.g., issuing a virtual card, money transfer)",
              t.newPrivacyPolicyS3Li3 || "Improve our site and services",
              t.newPrivacyPolicyS3Li4 || "Send you communications (marketing only if you have consented)",
              t.newPrivacyPolicyS3Li5 || "Comply with our legal and regulatory obligations"
            ]
          }
        ]
      },
      {
        title: t.newPrivacyPolicyS4Title || "4. Cookies",
        content: [
          t.newPrivacyPolicyS4P1 || "We use cookies to:",
          {
            type: 'list',
            items: [
              t.newPrivacyPolicyS4Li1 || "Ensure the proper functioning of the site",
              t.newPrivacyPolicyS4Li2 || "Measure audience",
              t.newPrivacyPolicyS4Li3 || "Personalize the user experience"
            ]
          },
          t.newPrivacyPolicyS4P2 || "You can manage your preferences via your browser settings."
        ]
      },
      {
        title: t.newPrivacyPolicyS5Title || "5. Data sharing",
        content: [
          t.newPrivacyPolicyS5P1 || "Your data may be shared with:",
          {
            type: 'list',
            items: [
              t.newPrivacyPolicyS5Li1 || "Our technical service providers (hosting, payment, etc.)",
              t.newPrivacyPolicyS5Li2 || "Competent authorities, if required by law",
              t.newPrivacyPolicyS5Li3 || "No third party will receive your data for commercial purposes without your explicit consent"
            ]
          }
        ]
      },
      {
        title: t.newPrivacyPolicyS6Title || "6. Data retention period",
        content: [
          t.newPrivacyPolicyS6P1 || "Your data is kept as long as necessary to achieve the purposes mentioned above, then deleted or anonymized."
        ]
      },
      {
        title: t.newPrivacyPolicyS7Title || "7. Data security",
        content: [
          t.newPrivacyPolicyS7P1 || "We implement technical and organizational security measures to protect your data against unauthorized access, modification, or destruction."
        ]
      },
      {
        title: t.newPrivacyPolicyS8Title || "8. Your rights",
        content: [
          t.newPrivacyPolicyS8P1 || "In accordance with the General Data Protection Regulation (GDPR), you have the following rights:",
          {
            type: 'list',
            items: [
              t.newPrivacyPolicyS8Li1 || "Right of access, rectification, deletion",
              t.newPrivacyPolicyS8Li2 || "Right to limitation of processing",
              t.newPrivacyPolicyS8Li3 || "Right to portability",
              t.newPrivacyPolicyS8Li4 || "Right to object",
              t.newPrivacyPolicyS8Li5 || "Right to withdraw your consent at any time"
            ]
          },
          <>
            {t.newPrivacyPolicyS8P2PreLink || "To exercise your rights, contact us at: "}
            <a href="mailto:contact@mikaty.com" className="text-primary hover:underline">contact@mikaty.com</a>
          </>
        ]
      },
      {
        title: t.newPrivacyPolicyS9Title || "9. Data transfer outside the EU",
        content: [
          t.newPrivacyPolicyS9P1 || "If your data is transferred outside the European Union, this will only be done to countries ensuring an adequate level of protection or with appropriate contractual guarantees."
        ]
      },
      {
        title: t.newPrivacyPolicyS10Title || "10. Modification of the privacy policy",
        content: [
          t.newPrivacyPolicyS10P1 || "This policy may be modified at any time. In the event of a significant change, we will inform you by email or on the site."
        ]
      },
      {
        title: "", 
        content: [
          <>
            <Mail className="inline-block mr-2 h-5 w-5 text-primary" />
            {t.newPrivacyPolicyS11P1PreLink || "For any questions regarding this privacy policy, you can contact us at: "}
            <a href="mailto:contact@mikaty.com" className="text-primary hover:underline">contact@mikaty.com</a>
          </>
        ]
      }
    ]
  };

  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-background to-background/80 dark:from-background dark:to-background/90 text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block p-4 mb-6 bg-primary/10 rounded-full text-primary">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{content.title}</h1>
          <p className="text-lg md:text-xl text-foreground/70 dark:text-foreground/60 max-w-2xl mx-auto">{content.lastUpdated}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl border border-border/50"
        >
          <article className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 dark:text-foreground/80">
            <p className="lead">{content.intro}</p>

            {content.sections.map((section, index) => (
              <section key={index} className="mt-8">
                {section.title && <h2 className="text-2xl font-semibold gradient-text !mb-4">{section.title}</h2>}
                {section.content.map((item, itemIndex) => {
                  if (typeof item === 'string') {
                    return <p key={itemIndex}>{item}</p>;
                  } else if (item.type === 'list') {
                    return (
                      <ul key={itemIndex} className="list-disc pl-6 space-y-1 mb-4">
                        {item.items.map((listItem, listItemIndex) => (
                          <li key={listItemIndex}>{listItem}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={itemIndex}>{item}</p>; 
                })}
              </section>
            ))}
          </article>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;