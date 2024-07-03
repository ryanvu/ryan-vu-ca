import { Poppins, IBM_Plex_Mono } from "next/font/google";
import { motion, useInView, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const ibm = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const experiences = [
  {
    title: "Syzl",
    date: "May 2022 - Current",
    description: "Intermediate Software Developer",
    src: "/experience/syzl.png",
    location: "Toronto, ON",
  },
  {
    title: "ryanvu.ca",
    date: "Jan 2019 - Current",
    description: "Design & Web Development",
    src: "/experience/ryanvu.png",
    location: "Anywhere",
  },
];

export const Experience = () => {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="h-[50vh] flex flex-col justify-evenly w-full relative p-4 border-t-[1px] border-black">
      <div ref={ref} className="grid grid-rows-3 absolute top-0 left-0 h-full w-full">
        <motion.div
          initial={{ width: "0%" }}
          animate={isInView && { width: "100%", transition: { duration: 2 } }}
          className="flex items-center justify-center px-8 md:px-2"
        >
          <h1 className="text-[8vw]" style={ibm.style}>
            Work
          </h1>
        </motion.div>

        <motion.div
          initial={{ width: "0%" }}
          animate={isInView && { width: "100%", transition: { duration: 1 } }}
          className="flex flex-col overflow-hidden justify-center border-black h-full"
        >
          <Card
            title={experiences[0].title}
            date={experiences[0].date}
            description={experiences[0].description}
            location={experiences[0].location}
          />
        </motion.div>

        <motion.div
          initial={{ width: "0%" }}
          animate={isInView && { width: "100%", transition: { duration: 1 } }}
          className="flex flex-col overflow-hidden justify-center border-black h-full"
        >
          <Card
            title={experiences[1].title}
            date={experiences[1].date}
            description={experiences[1].description}
            location={experiences[1].location}
          />

        </motion.div>

      </div>
    </section>
  );
};

const Card = ({ title, date, description, src, location }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -200 }}
      animate={
        isInView && {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, ease: "circInOut" },
        }
      }
      className="flex flex-col w-full"
    >
      <div className="flex flex-col">
        <div
          className="flex items-center gap-2 p-2 uppercase border-b-[1px] border-black bg-black text-white"
          style={ibm.style}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
            className="h-2 w-2 bg-white rotate-45"
          ></motion.div>
          <span>{date}</span>
        </div>
        <h2 className={`${poppins.className} text-4xl md:text-6xl p-2 py-4`}>{title}</h2>
        <div className="flex border-t-[1px] border-black justify-between text-xs p-2">
          <span>{description}</span>
          <span>{location}</span>
        </div>
      </div>
    </motion.div>
  );
};
