import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import MikatyLogoNavbar from '@/assets/images/logo-transp.webp';

const Logo = ({ onClick, isHeroVisible }) => {
  const logoTextClass = cn(
    "ml-2 md:ml-3 font-bold transition-colors duration-300 flex items-center",
    "text-[1.5rem] tracking-tight", 
    isHeroVisible ? "text-white" : "text-foreground"
  );

  return (
    <Link to="/" className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" onClick={onClick}>
      <motion.img
        src={MikatyLogoNavbar}
        alt="Mikaty Logo"
        className="h-[60px] w-[60px]" 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05, rotate: -5 }}
      />
      <motion.span 
        className={logoTextClass}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Mikaty
      </motion.span>
    </Link>
  );
};

export default Logo;