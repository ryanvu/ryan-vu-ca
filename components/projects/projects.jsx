import { IBM_Plex_Mono } from "next/font/google";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const projects = [
  { title: "meal.", year: '2024', imgs: [{ src: '/images/projects/meal/meal-1.png', alt: '' }, { src: '/images/projects/meal/meal-2.png', alt: '' }, { src: '/images/projects/meal/meal-3.png', alt: '' }] },
  { title: "Capital Golf Exchange", year: '2022', imgs: [] },
  { title: "Natalie Mitchell Music", year: '2021', imgs: [] },
  { title: "learn kanji", year: '2021', imgs: [] },
  { title: "deluxe time", year: '2019', imgs: [{ src: '/images/projects/deluxe/deluxe-1.png', alt: '' }] },
]

const ibm = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export const Projects = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const targetRef = useRef(null);
  return (
    <section ref={targetRef} className="relative flex flex-col gap-12 w-full p-4 lg:p-8">
      {/* <InfiniteText text="Projects  Projects  Projects  Projects  Projects" /> */}
      <h1 className="text-[4vw] leading-10 ml-auto uppercase" style={ibm.style}>Projects</h1>
      <div className="flex gap-4">
        <div className="hidden lg:flex h-[60vh] w-[40vw] border-black border-[1px]">
          {selectedIndex !== null && (
            <div>Displaying details for project {projects[selectedIndex].title}</div>
          )}
        </div>
        <div className="flex flex-col flex-grow">
          {
            projects.map((p, i) => {
              return (
                <ProjectDiv
                  project={p}
                  index={i}
                  key={i}
                  isSelected={selectedIndex === i}
                  onSelected={() => setSelectedIndex(i)}
                />
              )
            })
          }
        </div>
      </div>
    </section>
  );
};

const ProjectDiv = ({ project, index, isSelected, onSelected }) => {

  return (
    <>
      <motion.div
        className="grid grid-cols-3 text-lg border-b-[1px] p-2 border-black"
        onClick={onSelected}
        whileHover={{ opacity: 0.4 }}
      >
        <span style={ibm.style}>RV-00{index + 1}</span>
        <span className="uppercase">{project.title}</span>
        <span className="justify-self-end">{project.year}</span>
      </motion.div>
      {isSelected &&
        <AnimatePresence mode="popLayout">
          <motion.div className="flex gap-1 m-2" key={isSelected} initial={{ height: 0 }} animate={{ height: 180, transition: { duration: 0.2 } }} exit={{ height: 0, transition: { duration: 0.2 } }}>
            {project.imgs.map((img, i) => { 
              return <div key={i} className="border-current border relative aspect-video w-60 h-44">
                <Image fill src={img.src} alt={img.alt} className="object-cover" />
              </div>
            })}
          </motion.div>
        </AnimatePresence>}
    </>
  )
}
