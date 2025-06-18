import React from 'react';
import { motion } from 'framer-motion';
import MobileSidebarHeader from '@/components/mobile_sidebar/MobileSidebarHeader';
import MobileSidebarNav from '@/components/mobile_sidebar/MobileSidebarNav';
import MobileSidebarFooter from '@/components/mobile_sidebar/MobileSidebarFooter';

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.4, 
    }
  },
  closed: {
    x: "100%",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.3,
      delay: 0.1 
    }
  }
};

const MobileSidebar = ({ isOpen, onClose, navItems, currentPath, t, getLocalizedPath, isCurrentPath }) => {
  return (
    <motion.aside
      key="mobile-sidebar"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      exit="closed"
      variants={sidebarVariants}
      className="fixed top-0 right-0 h-full w-full sm:w-4/5 md:w-1/2 max-w-md z-40 flex flex-col bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white shadow-2xl lg:hidden"
    >
      <div className="flex flex-col h-full p-6 pt-4">
        <MobileSidebarHeader onClose={onClose} />
        <div className="flex-grow overflow-y-auto pt-8 pb-4 custom-scrollbar-dark">
          <MobileSidebarNav 
            navItems={navItems} 
            onLinkClick={onClose}
            t={t}
            getLocalizedPath={getLocalizedPath}
            isCurrentPath={isCurrentPath}
          />
        </div>
        <MobileSidebarFooter t={t} onClose={onClose} onLinkClick={onClose} />
      </div>
    </motion.aside>
  );
};

export default MobileSidebar;