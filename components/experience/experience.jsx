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

    <section className="h-[50vh] flex flex-col w-full relative p-4 my-20">
      <div className="grid grid-rows-3 p-4 gap-4 lg:grid-cols-3 lg:grid-rows-none lg:p-8 lg:gap-12 absolute top-0 left-0 h-full w-full">
        {experiences.map((experience, index) => {
          return (
            experience.isTitle ? <h1 className="text-[4vw] leading-[3vw] uppercase" style={ ibm.style }>{experience.title}</h1> :
            <Div index={index + 1} key={index}>
              <GridCard title={experience.title} date={experience.date} description={experience.description} location={experience.location} index={index} src={experience.src} />
            </Div>
          )
        })}
      </div>
    </section>
  );
};

const GridCard = ({ title, date, description, location, index, src }) => {
  return (
    <div className="relative text-[3vw] h-full w-full flex flex-row-reverse justify-between items-center lg:flex-col lg:items-start" style={poppins.style}>
      <div className="flex flex-col text-right text-[2vw] flex-grow lg:text-lg lg:text-left">
        <span style={ibm.style}>{date}</span>
        <span>{description}</span>
        <span className="text-sm opacity-80" style={ ibm.style }>{location}</span>
      </div>

      <div className="flex w-full justify-between items-end">
        <div className="flex flex-col leading-[3vw] lg:mt-auto">
          <span>0{index}</span>
          <span>{title}</span>
        </div>
        { src && 
          <div className="hidden lg:block relative h-full w-[8vw]">
            <Image src={src} fill className="object-contain" alt={title} />
          </div>
        }
      </div>
    </div>
  )
};

// const Cubes = () => {
//   return (
//     <div className="absolute top-0 right-4 w-5 grid gap-1 grid-cols-2 grid-rows-2">
//       <div className="h-2 w-2 bg-black"></div>
//       <div className="h-2 w-2 bg-black"></div>
//       <div className="h-2 w-2 bg-black"></div>
//       <div className="h-2 w-2 bg-black"></div>
//     </div>
//   )
// }


const Div = ({ children, index }) => {
  const anim = {
    initial: { opacity: 0, y: "50%" },
    animate: (i) => ({ opacity: 1, y: "0%", transition: { duration: 1, delay: 0.5 * i } }),
  };

  const className = "flex flex-col overflow-hidden border-black h-full";

  return (
    <motion.div
      variants={anim}
      custom={index}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  )
}

