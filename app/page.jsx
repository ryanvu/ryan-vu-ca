"use client";
import Image from "next/image";

import { useState, useRef, useEffect } from "react";
import { IBM_Plex_Mono, Poppins } from "next/font/google";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { Experience } from "@/components/experience/experience";
import { fadedTitles, homeImages } from "@/components/animations";
import { Projects } from "@/components/projects/projects";

const ibm = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const titles = [
  { title: "Ryan Vu", src: "/images/ryan-profile.jpg" },
  { title: "Developer &", src: "/images/home-2.jpg" },
  { title: "Photographer", src: "https://i.imgur.com/YrVjYa3.jpg" },
];

export default function Home() {
  const container = useRef(null);
  const [hovered, setHover] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHover((prevHover) => (prevHover + 1) % titles.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <main className="flex flex-col items-center justify-center overflow-hidden relative">
      <section
        ref={container}
        className="h-screen relative flex flex-col w-full md:justify-center mt-16 overflow-hidden"
      >
        <div className="flex md:justify-center w-full sm:p-1 md:p-16 flex-grow">
          <div className="flex flex-col justify-between w-5/6 gap-4 h-4/5 p-8">
            <div className="flex flex-col gap-2">
              {titles.map(({ title }, index) => {
                return (
                  <AnimatePresence key={index} mode="wait">
                    <motion.div
                      key={index}
                      style={poppins.style}
                      variants={fadedTitles}
                      initial="initial"
                      animate={hovered === index ? "hovered" : "notHovered"}
                      exit={hovered !== index ? "notHovered" : "hovered"}
                      className={`z-30 ${hovered === 2 ? "text-black" : "text-white"} md:text-black w-1/3`}
                    >
                      <h1 className="text-4xl md:text-6xl lowercase">
                        {title}
                      </h1>
                    </motion.div>
                  </AnimatePresence>
                );
              })}
            </div>

            <div
              className={`${ibm.className} z-30 ${hovered === 2 ? "text-black" : "text-white"} md:text-black w-1/2`}
            >
              <p>
                Ryan is a software developer and photographer based in Toronto,
                Canada.
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={hovered}
                variants={homeImages}
                initial="initial"
                animate="enter"
                exit="exit"
                className="absolute right-0 top-0 h-screen w-full md:w-2/5 z-20"
              >
                <Image
                  sizes={"(max-width: 1250px) 100vw, 1250px"}
                  src={titles[hovered]?.src}
                  fill
                  className="object-cover"
                  alt={titles[hovered]?.title}
                ></Image>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Experience />
      <Projects />
    </main>
  );
}
