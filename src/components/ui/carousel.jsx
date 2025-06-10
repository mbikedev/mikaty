import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ children, autoPlay = true, interval = 4000, loop = true, showIndicators = true }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const childrenArray = React.Children.toArray(children);
    const totalSlides = childrenArray.length;

    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval, totalSlides]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full overflow-hidden rounded-xl">
            <div className="relative w-full h-auto">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {childrenArray[currentIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>

            {showIndicators && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {childrenArray.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                index === currentIndex
                                    ? "bg-purple-500"
                                    : "bg-white/50 hover:bg-white/80"
                            }`}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carousel;
