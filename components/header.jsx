"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, height, opacity, slide } from './animations';
import { Poppins, IBM_Plex_Mono } from 'next/font/google';
import { Titles } from './titles';

const links = [
  { link: "Home", href: "/" },
  { link: "Photos", href: "/photos" },
  { link: "About", href: "/about" },
]

const ibm = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const Header = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`${ibm.className} flex flex-col fixed w-full z-50`}>
      <div className="flex flex-row justify-between w-full p-4 mx-auto md:min-w-[768px] lg:min-w-[1080px]">
        <h1 className="text-2xl">RYAN VU</h1>
        <div className="hidden md:flex">
          <Titles />
        </div>
        <motion.div className="menu relative flex items-center gap-2 cursor-pointer self-start z-50" onClick={toggleMenu}>
          <div className={isOpen ? 'burger burgerActive' : 'burger'}></div>
          <motion.p variants={opacity} animate={isOpen ? "closed" : "open"}>MENU</motion.p>
          <motion.p className="absolute right-0 opacity-0 text-black" variants={opacity} animate={!isOpen ? "closed" : "open"}>CLOSE</motion.p>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {isOpen &&
          <motion.nav className="flex flex-row p-4 justify-between absolute overflow-hidden bg-white text-black w-full" variants={height} initial="initial" animate="enter" exit="exit">
            <ul className="flex flex-col">
              {
                links.map(({ link, href }, index) => (
                  <motion.li key={index} custom={index} variants={slide} initial="initial" animate="enter" exit="exit" whileHover={{ x: "2vw", scale: 1.2, transition: { duration: 0.7 } }} className="text-[5vw]">
                    <Link href={href}>
                      {link}
                    </Link>
                  </motion.li>
                ))
              }
            </ul>
            <motion.div className="fixed bottom-0 right-0 p-4" variants={fadeIn} initial="initial" animate="enter" exit="exit">
              <Image width="120" height="120" src="/icons/logo-light.svg" alt="Ryan's Logo"></Image>
            </motion.div>
          </motion.nav>
        }
      </AnimatePresence>
    </header>
  );
}
