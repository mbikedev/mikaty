// noinspection JSXUnresolvedComponent,JSUnresolvedReference

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const DesktopNav = ({ navItems, navLinkClasses, t, isHeroVisible, getLocalizedPath, isCurrentPath }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const registerButtonClass = cn(
    "gradient-button font-semibold px-5 py-2.5 text-sm h-10",
    isHeroVisible ? "bg-white/20 hover:bg-white/30 text-white border border-white/50" : "bg-primary text-primary-foreground hover:bg-primary/90"
  );


  // noinspection JSUnresolvedReference
  return (
    <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
      {navItems.map((item) => {
        const label = t[item.labelKey] || item.defaultLabel;
        const localizedPath = getLocalizedPath(item.path);

        if (item.isButton) {
          return (
            <motion.div
              key={item.labelKey}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                asChild 
                className={registerButtonClass}
              >
                <Link to={localizedPath}>{label}</Link>
              </Button>
            </motion.div>
          );
        }
        
        if (item.dropdown) {
          return (
            <div 
              key={item.labelKey} 
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.labelKey)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <NavLink 
                to={localizedPath} 
                className={() => navLinkClasses(item.path)} // Pass original English path for isActive check
                aria-haspopup="true"
                aria-expanded={openDropdown === item.labelKey}
                onClick={(e) => { if (!item.path || item.path === '#') e.preventDefault(); }}
              >
                <span className="flex items-center">
                  {label}
                  <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${openDropdown === item.labelKey ? 'rotate-180' : ''}`} />
                </span>
              </NavLink>
              <AnimatePresence>
                {openDropdown === item.labelKey && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-56 origin-top-left rounded-md shadow-lg bg-popover border border-border py-1 z-20"
                  >
                    {item.dropdown.map((subItem) => {
                      const subLabel = t[subItem.labelKey] || subItem.defaultLabel;
                      const subLocalizedPath = getLocalizedPath(subItem.path);
                      return (
                        <NavLink
                          key={subItem.path}
                          to={subLocalizedPath}
                          className={() => 
                            `flex items-center px-4 py-2 text-sm transition-colors
                            ${isCurrentPath(subItem.path) ? 'bg-primary/10 text-primary' : 'text-popover-foreground hover:bg-muted'}`
                          }
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subItem.icon && <subItem.icon size={16} className="mr-2" />}
                          {subLabel}
                        </NavLink>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }
        return (
          <NavLink key={item.labelKey} to={localizedPath} className={() => navLinkClasses(item.path)}>
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default DesktopNav;