"use client";

import React, { useRef } from 'react';
import { motion, useTransform, useMotionValueEvent, useInView } from 'framer-motion';
import Image from 'next/image';
import { useScrollBasedImage } from '@/hooks/image-hooks';
import { IBM_Plex_Mono, Open_Sans } from 'next/font/google';

const open = Open_Sans({ subsets: ["latin"], weight: ["400", "500"] });
const ibm = IBM_Plex_Mono({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const titles = [
  { title: "Ryan Vu", src: "/images/ryan-profile.jpg" },
  { title: "Developer &", src: "/images/toronto.png" },
  { title: "Photographer", src: "https://i.imgur.com/YrVjYa3.jpg" },
];

const aboutP2 = [
  "I approach every aspect of life with the same dedication I bring to coding.",
  "I'm pushing my limits in weight training and going on long runs, I'm always striving for progress.",
  "This mentality carries over to my professional life, where each challenge is an opportunity to grow and excel.",
  "Photography and graphic design challenge me to see the world differently, enhancing my creative problem-solving abilities.",
  "It's not about being the best, but about giving my best in everything I do — a mindset that continually shapes me as a developer and as a person."
];

const Sentence = ({ children, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });


  return (
    <motion.div
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.35, scale: 0.9 }} ref={ref} className="flex items-center gap-2 py-[5vh]">
      <span style={ibm.style}>0{index + 1}</span>
      <span>
        ──────────────────
      </span>
      <span>
        {children}
      </span>
    </motion.div>
  );
}

const About = () => {
  const containerRef = useRef(null);
  const images = [titles[1].src, titles[2].src];
  const { currentImage, scrollYProgress } = useScrollBasedImage(images, containerRef);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.5, 0.8, 0.9, 1], [0, 1, 1, 0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[600vh] overflow-hidden">
      {/* Sticky image container */}
      <motion.div
        className="fixed top-0 left-[-50%] md:left-0 w-full md:w-1/2 h-screen"
        style={{ opacity }}
      >
        <Image
          src={currentImage}
          alt="Scrolling Image"
          fill
          className="object-cover object-top relative md:py-20 md:pl-20"
          priority
        />
      </motion.div>

      <div className="absolute top-0 right-0 w-1/2 min-h-[400vh]">
        <div className="h-screen" /> {/* Spacer to align content with image */}

        <div className="p-8">
          <h2 className="text-[3.5vw] text-pretty" style={open.style}>
            Hi, I&apos;m Ryan👋
            <div className="my-4"></div>
            I&apos;m a software developer based in Toronto📍
          </h2>
        </div>

        <div className="p-8">
          <h2 className="text-[3vw] md:text-[1.25vw] text-pretty" style={open.style}>
            I&apos;m driven by art, design, and technology. I love to create and build things.
            <div className="my-2"></div>
            Currently, I work as an <strong className="italic">Intermediate Software Developer</strong> at <strong>Syzl</strong>.
            <div className="my-2"></div>
            My goal is <strong className="italic">simple yet profound</strong>: to evolve into a better version of myself every day.
            <div className="my-2"></div>
            I am always looking for new opportunities to learn and grow. Whether it be in software development, design, or photography.
          </h2>
        </div>


        <div className="h-[250vh] flex flex-col items-center justify-center">
          <motion.div className="relative w-full h-screen">
            <Image
              src="/images/ginza.jpg"
              alt="Ginza"
              fill
              className="object-contain relative py-20 pl-8"
              priority
            />
          </motion.div>

          <motion.div className="relative w-full h-screen">
            <Image
              src="/images/van.JPG"
              alt="van"
              fill
              className="object-contain relative py-20 pl-8 pr-12"
              priority
            />
          </motion.div>


          <motion.div className="relative w-full h-screen">
            <Image
              src="/images/akasaka-night.jpg"
              alt="Akasaka Night"
              fill
              className="object-contain relative py-20 pl-8"
              priority
            />
          </motion.div>

        </div> {/* Spacer to align content with image */}

        <div className="p-8 font-semibold">
          <div className="text-[2.5vw] text-pretty" style={open.style}>
            Beyond the Code
            <div className="my-4"></div>
            Pursuing Growth in Every Aspect
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-col gap-1 text-[3vw] md:text-base text-pretty w-full" style={open.style}>
            {
              aboutP2.map((sentence, index) => <Sentence key={index} index={index}>{sentence}</Sentence>)
            }
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
