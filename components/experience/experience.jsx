import { Poppins, IBM_Plex_Mono } from "next/font/google";
import { motion, useInView, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const ibm = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const experiences = [
  {
    isTitle: true,
    title: "Work",
  },
  {
    isTitle: false,
    title: "Syzl",
    date: "May 2022 - Current",
    description: "Intermediate Software Developer",
    src: "/experience/syzl.png",
    location: "Toronto, ON",
  },
  {
    isTitle: false,
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
    <section className="h-[50vh] w-full relative border-t-[1px] border-black">
      <div ref={ref} className="grid grid-rows-3 h-full w-full">
        {experiences.map((experience, index) => {
          return (
            <Div index={index + 1} key={index} isInView={isInView}>
              { 
                experience.isTitle ? 
                <h1 className="text-[8vw] px-4" style={ibm.style}>Work</h1> : 
                <Card title={experience.title} date={experience.date} description={experience.description} location={experience.location} />
              }
            </Div>
          )
        })}
      </div>
    </section>
  );
};

const Div = ({ children, isInView, index }) => {
  const anim = {
    initial: { width: "0%" },
    animate: (i) => (isInView && { width: "100%", transition: { duration: 1, delay: 0.5 * i } }),
  };

  return (
    <motion.div
      variants={anim}
      custom={index}
      initial="initial"
      animate="animate"
      className="flex flex-col overflow-hidden justify-center border-black h-full"
    >
      {children}
    </motion.div>
  )
}

const Card = ({ title, date, description, src, location }) => {

  return (
    <motion.div
      whileHover={{ width: "80%", transition: { duration: 0.5 } }}
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
