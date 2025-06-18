import React from 'react';
import { motion } from 'framer-motion';
import StarRating from './StarRating';

const TestimonialCard = ({ clientName, testimonial, imageUrl, rating, altText }) => (
  <motion.div 
    className="bg-card/80 dark:bg-background/70 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-2xl border border-primary/20 dark:border-primary/30 flex flex-col items-center text-center overflow-hidden h-full min-h-[420px] md:min-h-[460px]"
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="relative mb-6">
      <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-primary/40 dark:border-primary/60 shadow-xl">
        <img
          className="w-full h-full object-cover object-center" 
          alt={altText || "Client profile picture"}
          src={imageUrl} 
        />
      </div>
      <div className="absolute bottom-0 right-0 bg-background dark:bg-card p-2 rounded-full shadow-lg border border-primary/30 transform translate-x-1/4 -translate-y-1/4">
        <StarRating rating={rating} starSize="h-4 w-4" />
      </div>
    </div>
    <h4 className="font-bold text-xl md:text-2xl text-foreground dark:text-primary-foreground mb-3">{clientName}</h4>
    <p className="text-foreground/80 dark:text-foreground/70 italic text-sm md:text-base leading-relaxed mb-4 flex-grow">
      "{testimonial.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < testimonial.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}"
    </p>
  </motion.div>
);

export default TestimonialCard;