import { Poppins, IBM_Plex_Mono } from "next/font/google";
import { motion } from "framer-motion";
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
    src: "/icons/ryanvu-logo.svg",
    location: "Anywhere",
  },
];

export const Experience = () => {
  return (
    <section className="h-screen flex flex-col w-full relative p-4 border-t-[1px] border-black">
      <div className="grid grid-rows-3 absolute top-0 left-0 h-full w-full">
        {experiences.map((experience, index) => {
          return (
            <Div index={index + 1} key={index}>
              {
                experience.isTitle ?
                  <h1 className="text-[8vw] px-4" style={ibm.style}>Work</h1> :
                  <Card title={experience.title} src={experience.src} date={experience.date} description={experience.description} location={experience.location} />
              }
            </Div>
          )
        })}
      </div>
    </section>
  );
};

const Div = ({ children, index }) => {
  const anim = {
    initial: { opacity: 0, x: "-100%" },
    animate: (i) => ({ opacity: 1, x: "0%", transition: { duration: 1, delay: 0.5 * i } }),
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
    <div className="flex flex-col m-4 border-black border-[1px]">

      <div
        className="flex items-center gap-2 p-2 uppercase bg-black text-white"
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

      <div className="flex justify-between items-center">
        <h2 className={`${poppins.className} flex-grow text-4xl md:text-6xl pl-4`}>{title}</h2>
        <div className="relative w-32 h-32 flex">
          <Image src={src} alt={title} fill className="object-contain p-4" />
        </div>
      </div>

      <div className="flex border-t-[1px] border-black justify-between text-xs p-2">
        <span>{description}</span>
        <span>{location}</span>
      </div>
    </div >
  );
};
