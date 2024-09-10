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
    }, 2500);
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

const titles2 = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* {titles.map(({ title }, index) => { */}
      {/*   return ( */}
      {/*     <AnimatePresence key={index} mode="wait"> */}
      {/*       <motion.div */}
      {/*         key={index} */}
      {/*         style={poppins.style} */}
      {/*         variants={fadedTitles} */}
      {/*         initial="initial" */}
      {/*         animate={hovered === index ? "hovered" : "notHovered"} */}
      {/*         exit={hovered !== index ? "notHovered" : "hovered"} */}
      {/*         className={`z-30 ${hovered === 2 ? "text-black" : "text-white"} md:text-black w-1/3`} */}
      {/*       > */}
      {/*         <h1 className="text-4xl md:text-6xl lowercase"> */}
      {/*           {title} */}
      {/*         </h1> */}
      {/*       </motion.div> */}
      {/*     </AnimatePresence> */}
      {/*   ); */}
      {/* })} */}
            {/* <AnimatePresence mode="wait"> */}
            {/*   <motion.div */}
            {/*     key={hovered} */}
            {/*     variants={homeImages} */}
            {/*     initial="initial" */}
            {/*     animate="enter" */}
            {/*     exit="exit" */}
            {/*     className="absolute right-0 top-0 h-screen w-full md:w-2/5 z-20" */}
            {/*   > */}
            {/*     <Image */}
            {/*       sizes={"(max-width: 1250px) 100vw, 1250px"} */}
            {/*       src={titles[hovered]?.src} */}
            {/*       fill */}
            {/*       className="object-cover" */}
            {/*       alt={titles[hovered]?.title} */}
            {/*     ></Image> */}
            {/*   </motion.div> */}
            {/* </AnimatePresence> */}

    </div>
  )
}
