"use client";

// import { useState, useRef, useEffect } from "react";
import { IBM_Plex_Mono, Poppins, Work_Sans } from "next/font/google";
// import { InfiniteText } from "@/components/infinite-text";
import { Experience } from "@/components/experience/experience";
// import { fadedTitles, homeImages } from "@/components/animations";
import { Projects } from "@/components/projects/projects";
import {  motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ibm = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });

// const work = Work_Sans({ subsets: ["latin"], weight: ["400", "500"] });

const titles = [
  { title: "Ryan Vu", src: "/images/ryan-profile.jpg" },
  { title: "Developer &", src: "/images/home-2.jpg" },
  { title: "Photographer", src: "https://i.imgur.com/YrVjYa3.jpg" },
];

export default function Home() {

  const targetRef = useRef();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['end end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0.5, 1.0], ['95%', '30%']);
  const clipLeft = useTransform(scrollYProgress,
    [0.5, 1],
    ['polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)', 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)']
  );
  const clipRight = useTransform(scrollYProgress,
    [0.5, 1],
    ['polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)', 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)']
  );

  return (
    <main className="flex flex-col items-center justify-center overflow-hidden relative">
      <div className="relative h-[100vh] w-full">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url(${titles[0].src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity,
            filter: "grayscale(90%)",
            clipPath: clipLeft
          }}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url(${titles[0].src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity,
            filter: "grayscale(90%)",
            clipPath: clipRight
          }}
        />
        <motion.section
          ref={targetRef}
          className="relative flex flex-col items-center justify-end h-full w-full md:justify-center"
        >
          <MainTitle title="ryan+vu creative developer"  scrollYProgress={scrollYProgress} />
        </motion.section>
      </div>
      <Experience />
      <Projects />
    </main>
  );
}

const MainTitle = ({ title, scrollYProgress }) => {

  const textY  = useTransform(scrollYProgress, [0, .25], ['0%', '250%']);
  const scale  = useTransform(scrollYProgress, [0.1, 0.4], ['100%', '20%']);
  const width  = useTransform(scrollYProgress, [0.1, 0.4], ['100%', '0%']);
 

  return (
    <motion.div className="flex flex-col w-full justify-evenly md:items-center p-4 md:p-12 md:flex-row" style={{ ...ibm.style, scale, transformOrigin: 'center center', y: textY }}>
      {title.split(" ").map((word, index, array) => {
        return (
          <motion.div
            key={index}
            className="flex items-center gap-8"
          >
            <motion.h1 className="text-[5vw] md:text-[4vw] uppercase text-white">{word}</motion.h1>
            {index < array.length - 1 && (
              <motion.span
                className="hidden text-[5vw] md:text-[2vw] md:block text-white"
                style={{ width }}
              >───────</motion.span>
            )}
          </motion.div>
        )
      })}
    </motion.div>

  )
}
