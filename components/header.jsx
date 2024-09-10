"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { fadeIn, height, opacity, slide } from './animations';
import { IBM_Plex_Mono } from 'next/font/google';
import { Titles } from './titles';

const links = [
  { link: "Home", href: "/", available: true },
  { link: "Photos", href: "/photos", available: false },
  { link: "About", href: "/about", available: false },
]

const ibm = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pendingHref, setPendingHref] = useState(null);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (href) => {
    setIsAnimating(true);
    setPendingHref(href);
    setIsOpen(false);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    if (pendingHref) {
      router.push(pendingHref);
      setPendingHref(null);
    }
  };

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  let scrollTimeout;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > previous || latest < previous && latest > 100 || latest < 100) {
      setHidden(true);
      setScrolling(true);
      clearTimeout(scrollTimeout);
    } else {
      setScrolling(true);
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      setScrolling(false);
      setTimeout(() => {
        if (!scrolling) {
          setHidden(false);
        }
      }, 1000);
    }, 100);
  });

  return (
    <header className={`${ibm.className} flex flex-col fixed w-full z-50`}>
      <motion.div
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-row justify-between w-full p-4 mx-auto md:min-w-[768px] lg:min-w-[1080px]"
      >
        <h1 className="text-2xl">RYAN VU</h1>
        <div className="hidden md:flex">
          <Titles />
        </div>
        <motion.div className="menu relative flex items-center gap-2 cursor-pointer self-start z-50" onClick={toggleMenu}>
          <div className={isOpen ? 'burger burgerActive' : 'burger'}></div>
          <motion.p variants={opacity} animate={isOpen ? "closed" : "open"}>MENU</motion.p>
          <motion.p className="absolute right-0 opacity-0 text-black" variants={opacity} animate={!isOpen ? "closed" : "open"}>CLOSE</motion.p>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait" onExitComplete={handleAnimationComplete}>
        {isOpen &&
          <motion.nav className="flex flex-row p-4 justify-between absolute overflow-hidden bg-white text-black w-full" variants={height} initial="initial" animate="enter" exit="exit">
            <ul className="flex flex-col">
              {
                links.map(({ link, href, available }, index) => (
                  <motion.li key={index} custom={index} variants={slide} initial="initial" animate="enter" exit="exit" whileHover={{ x: "2vw", scale: 1.2, transition: { duration: 0.7 } }} className="text-[5vw]">
                    {available ?
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(href);
                        }}
                      >
                        {link}
                      </a> :
                      <h3 className="opacity-50">{link} <span className="text-lg">(Coming soon)</span></h3>
                    }
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
