// noinspection JSXUnresolvedComponent,JSUnresolvedReference

import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const navItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { y: { stiffness: 1000, velocity: -100 } }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: { y: { stiffness: 1000 } }
  }
};

const MobileSidebarNav = ({ navItems, onLinkClick, t, getLocalizedPath, isCurrentPath }) => {
  return (
    <motion.nav 
      className="flex flex-col flex-grow overflow-y-auto pr-2 -mr-2"
      initial="closed"
      animate="open"
      exit="closed"
      variants={{
        open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
      }}
    >
      <Accordion type="multiple" className="w-full">
        {navItems.map((item) => {
          const label = t[item.labelKey] || item.defaultLabel;
          const localizedPath = getLocalizedPath(item.path);
          
          // noinspection JSUnresolvedReference
          return (
            <motion.div key={item.labelKey} variants={navItemVariants}>
              {item.dropdown ? (
                <AccordionItem value={item.labelKey} className="border-b-0">
                  <AccordionTrigger className="text-xl font-medium transition-colors hover:text-yellow-300 py-3 px-2 block rounded-md text-white/90 hover:no-underline focus:text-yellow-300 focus:font-semibold">
                     <span className="flex items-center">
                      {item.icon && <item.icon size={20} className="mr-3" />}
                      {label}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8">
                    {item.dropdown.map(subItem => {
                      const subLabel = t[subItem.labelKey] || subItem.defaultLabel;
                      const subLocalizedPath = getLocalizedPath(subItem.path);
                      return (
                        <NavLink
                          key={subItem.path}
                          to={subLocalizedPath}
                          onClick={onLinkClick}
                          className={() => {
                            const active = isCurrentPath(subItem.path);
                            return `text-lg font-medium transition-colors hover:text-yellow-300 py-2 px-2 block rounded-md ${
                              active ? "text-yellow-300 font-semibold" : "text-white/80"
                            }`;
                          }}
                        >
                          <span className="flex items-center">
                            {subItem.icon && <subItem.icon size={18} className="mr-2" />}
                            {subLabel}
                          </span>
                        </NavLink>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              ) 
              : ( 
                <NavLink
                  to={localizedPath}
                  onClick={onLinkClick}
                  className={() => {
                    const active = isCurrentPath(item.path);
                    return `text-xl font-medium transition-colors hover:text-yellow-300 py-3 px-2 block rounded-md ${
                      active ? "text-yellow-300 font-semibold" : "text-white/90"
                    }`;
                  }}
                >
                  {() => {
                    const active = isCurrentPath(item.path);
                    return (
                      <span className={`relative inline-flex items-center ${active ? "pb-1" : ""}`}>
                        {item.icon && <item.icon size={20} className="mr-3" />}
                        {label}
                        {active && (
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                            layoutId="underline-mobile"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </span>
                    );
                  }}
                </NavLink>
              )}
            </motion.div>
          );
        })}
      </Accordion>
    </motion.nav>
  );
};

export default MobileSidebarNav;