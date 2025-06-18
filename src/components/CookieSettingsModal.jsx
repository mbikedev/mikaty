// noinspection JSUnresolvedReference

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart2, Settings2, Megaphone, Save } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'mikaty_cookie_consent_v2';

const CookieSettingsModal = ({ isOpen, onClose, onSave, onAcceptAll, t }) => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    performance: false,
    functional: false,
    targeting: false,
  });

  useEffect(() => {
    if (isOpen) {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (savedConsent) {
        const parsedConsent = JSON.parse(savedConsent);
        if (parsedConsent.preferences) {
          setPreferences(parsedConsent.preferences);
        } else if (parsedConsent.acceptedAll) {
           setPreferences({ necessary: true, performance: true, functional: true, targeting: true });
        }
      } else {
        setPreferences({ necessary: true, performance: false, functional: false, targeting: false });
      }
    }
  }, [isOpen]);

  const handleCheckboxChange = (category) => {
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    onSave(preferences);
  };

  const cookieCategories = [
    { id: 'necessary', label: t.cookieSettingsEssentialLabel, description: t.cookieSettingsEssentialDescription, icon: <ShieldCheck className="h-5 w-5 text-primary" />, disabled: true },
    { id: 'performance', label: t.cookieSettingsPerformanceLabel, description: t.cookieSettingsPerformanceDescription, icon: <BarChart2 className="h-5 w-5 text-primary" /> },
    { id: 'functional', label: t.cookieSettingsFunctionalLabel, description: t.cookieSettingsFunctionalDescription, icon: <Settings2 className="h-5 w-5 text-primary" /> },
    { id: 'targeting', label: t.cookieSettingsTargetingLabel, description: t.cookieSettingsTargetingDescription, icon: <Megaphone className="h-5 w-5 text-primary" /> },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px] bg-card text-card-foreground border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">{t.cookieSettingsTitle || "Cookie Preferences"}</DialogTitle>
          <DialogDescription className="text-foreground/70">
            {t.cookieSettingsDescription || "Manage your cookie preferences. You can enable or disable different types of cookies below."}
          </DialogDescription>
        </DialogHeader>
        <motion.div 
          className="space-y-6 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {cookieCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="flex items-start space-x-3 p-4 rounded-lg border border-border/70 bg-background/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
            >
              <div className="flex-shrink-0 mt-1">{category.icon}</div>
              <div className="flex-grow">
                <Label htmlFor={category.id} className="font-semibold text-foreground">{category.label || category.id}</Label>
                <p className="text-sm text-foreground/70">{category.description || "Description for " + category.id}</p>
              </div>
              <Checkbox
                id={category.id}
                checked={preferences[category.id]}
                onCheckedChange={() => handleCheckboxChange(category.id)}
                disabled={category.disabled}
                className="mt-1"
              />
            </motion.div>
          ))}
        </motion.div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>{t.cookieModalCancel || "Cancel"}</Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="mr-2 h-4 w-4" />
            {t.cookieSettingsSaveChanges || "Save Preferences"}
          </Button>
          <Button onClick={() => { onAcceptAll(); onClose(); }} className="bg-green-500 hover:bg-green-600 text-white">
            {t.cookieConsentAcceptAll || "Accept All"}
          </Button>
        </DialogFooter>
        {t.cookieSettingsPoweredBy && (
          <p className="text-xs text-muted-foreground text-center pt-2">{t.cookieSettingsPoweredBy}</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CookieSettingsModal;