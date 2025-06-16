import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/home/testimonial_components/TestimonialCard";
import { extractAndFormatNameFromUrl, testimonialsDataSource, newImageUrlsSource } from "@/components/home/testimonial_components/testimonialUtils";

import "swiper/css";
import "swiper/css/autoplay";

const TestimonialsSection = ({ t }) => {
  const baseTestimonialsData = testimonialsDataSource.map((testimonial, index) => ({
    ...testimonial,
    imageUrl: newImageUrlsSource[index] || "https://via.placeholder.com/150", 
  }));

  const duplicatedTestimonialsData = [...baseTestimonialsData, ...baseTestimonialsData];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-100 via-background to-sky-100 dark:from-slate-900 dark:via-background dark:to-sky-900/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground dark:text-primary-foreground mb-4 gradient-text">
            {t.testimonialsTitle || "What Our Clients Say"}
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 dark:text-foreground/60 max-w-2xl mx-auto">
            {t.testimonialsSubtitle || "Trusted by thousands of satisfied customers."}
          </p>
        </motion.div>

        <motion.div 
          className="relative group" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={30}
            loop={true}
            speed={5000} 
            autoplay={{
              delay: 1, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            grabCursor={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3.5,
                spaceBetween: 30,
              }
            }}
            className="pb-4" 
          >
            {duplicatedTestimonialsData.map((testimonial, index) => {
                const clientName = t[testimonial.nameKey] || extractAndFormatNameFromUrl(testimonial.imageUrl);
                const altText = t[testimonial.altTextKey] ? `${t[testimonial.altTextKey]}'s profile picture` : `${clientName}'s profile picture`;
                return (
                  <SwiperSlide key={index} className="!h-auto flex items-stretch" style={{ width: "auto" }}>
                    <div className="w-full max-w-sm md:max-w-md mx-auto h-full">
                      <TestimonialCard 
                        clientName={clientName}
                        testimonial={t[testimonial.feedbackKey]}
                        imageUrl={testimonial.imageUrl} 
                        rating={testimonial.rating}
                        altText={altText}
                      />
                    </div>
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </motion.div>
        
        <motion.div 
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <Button 
            asChild 
            size="lg" 
            className="gradient-bg text-primary-foreground font-semibold px-8 py-3 text-lg rounded-lg shadow-xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 transform active:scale-95"
          >
            <Link to="/register">
              {t.testimonialsCtaButton || "Join Thousands of Happy Users"}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;