"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IBM_Plex_Mono } from 'next/font/google';

const ibm = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"] });
export const Titles = () => {
  const titles = [
    "Human",
    "Software Developer",
    "Photographer",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [titles.length]);
  return (
    <AnimatePresence mode="wait">
      <motion.p
        className={`${ibm.className} mt-2 overflow-y-hidden uppercase`}
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      >{titles[currentIndex]}</motion.p>
    </AnimatePresence>
  );
}
