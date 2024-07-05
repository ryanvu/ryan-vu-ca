import { IBM_Plex_Mono } from "next/font/google";
import { useRef } from "react";
import { motion } from "framer-motion";

const projects = [
  { title: "meal.", year: '2024', imgs: [] },
  { title: "Capital Golf Exchange", year: '2022', imgs: [] },
  { title: "Natalie Mitchell Music", year: '2021', imgs: [] },
  { title: "learn kanji", year: '2021', imgs: [] },
  { title: "deluxe time", year: '2019', imgs: [] },
]

const ibm = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export const Projects = () => {
  const targetRef = useRef(null);
  return (
    <section ref={targetRef} className="relative flex flex-col gap-12 w-full p-4 lg:p-8">
      {/* <InfiniteText text="Projects  Projects  Projects  Projects  Projects" /> */}
      {/* <div className="h-96"> */}
      {/*   <h1>meal.</h1> */}
      {/* </div> */}
      {/* <div className="h-96"> */}
      {/*   <h1>meal.</h1> */}
      {/* </div> */}
      <h1 className="text-[4vw] leading-10 ml-auto">Projects</h1>
      <div className="flex gap-4">
        <div className="hidden lg:flex h-[60vh] w-[40vw] border-black border-[1px]"></div>
        <div className="flex flex-col flex-grow">
          {
            projects.map((p, i) => {
              return (
                <ProjectDiv title={p.title} year={p.year} index={i} key={i} />
              )
            })
          }
        </div>
      </div>
    </section>
  );
};

const ProjectDiv = ({ title, index, year }) => {
  const className = `grid grid-cols-3 text-lg border-b-[1px] p-2 border-black cursor-pointer hover:opacity-70` 
  return (
    <motion.div className={className}>
      <span style={ ibm.style }>RV-00{index + 1}</span>
      <span className="uppercase">{title}</span>
      <span className="justify-self-end">{year}</span>
    </motion.div>
  )
}
