"use client";

import Image from "next/image";
// import { useState, useRef, useEffect } from "react";
import { IBM_Plex_Mono, Poppins, Work_Sans } from "next/font/google";
import { Projects } from "@/components/projects/projects";
import About from "@/components/about/about";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
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
          <MainTitle title="ryan+vu creative developer" scrollYProgress={scrollYProgress} />
        </motion.section>
      </div>
      <About />
      {/* <Experience /> */}
      <Projects />
    </main>
  );
}

const Exp = () => {
  // const targetRef = useRef();
  // const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start end', 'end start'] });
  // const y = useTransform(scrollYProgress, [0.1, 0.16], ['-125%', '0vh']);
  // const x = useTransform(scrollYProgress, [0.16, 0.2], ['0%', '-25vw'])
  // const opacity = useTransform(scrollYProgress, [0.12, 0.2], ['80%', '100%']);
  // const scale = useTransform(scrollYProgress, [0.12, 0.2], ['0%', '100%']);

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Animations for the first 20% of scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.4], [0.5, 0.8, 0.3]);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] overflow-hidden">
      {/* Sticky image container */}
      <div className="fixed top-0 left-0 w-1/2 h-screen">
        <motion.div
          className="w-full h-full"
          style={{ opacity, scale }}
        >
          <Image
            src={titles[1].src}
            alt="Scrolling Image"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
      </div>

      {/* Scrollable content */}
      <div className="absolute top-0 right-0 w-1/2 min-h-[400vh]">
        <div className="h-screen" /> {/* Spacer to align content with image */}
        <div className="bg-white bg-opacity-75 p-8">
          <h2 className="text-3xl font-bold mb-4">Scrolling Content</h2>
          {Array(20).fill().map((_, i) => (
            <p key={i} className="my-4">Scroll content {i + 1}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

const MainTitle = ({ title, scrollYProgress }) => {
  const textY = useTransform(scrollYProgress, [0, 0.25], ['0%', '250%']);
  const scale = useTransform(scrollYProgress, [0.1, 0.4], ['100%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.15], ['100%', '0%']);

  return (
    <motion.div
      className="flex flex-col w-full justify-evenly md:items-center p-4 md:p-12 md:flex-row"
      style={{
        ...ibm.style,
        scale,
        transformOrigin: 'center center',
        y: textY
      }}
    >
      {title.split(" ").map((word, index, array) => (
        <motion.div
          key={index}
          className="flex items-center gap-8"
        >
          <motion.h1 className="text-[5vw] md:text-[4vw] uppercase text-white">
            {word}
          </motion.h1>
          {index < array.length - 1 && (
            <motion.span
              className="hidden text-[5vw] md:text-[2vw] md:block text-white"
              style={{ opacity }}
            >
              ───────
            </motion.span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};
