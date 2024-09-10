import { IBM_Plex_Mono, Barlow } from "next/font/google";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects } from "./project-data";
import Image from "next/image";


const ibm = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });
const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500"] });

export const Projects = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  const targetRef = useRef(null);

  const handleImgChange = (index) => {
    setSelectedImgIndex(index);
  }

  return (
    <section ref={targetRef} className="relative flex flex-col gap-12 w-full p-4 lg:p-8">
      {/* <InfiniteText text="Projects  Projects  Projects  Projects  Projects" /> */}
      <h1 className="text-[4vw] leading-10 ml-auto uppercase" style={ibm.style}>Projects</h1>
      <div className="flex gap-12">
        <div style={barlow.style} className="hidden lg:flex flex-col gap-2 h-[50vh] w-[40vw]">
          {selectedIndex !== null && (
            <ProjectImg
              isMain
              alt={projects[selectedIndex].imgs[selectedImgIndex]?.alt}
              src={projects[selectedIndex].imgs[selectedImgIndex]?.src} />
          )}

          <div className="grid grid-cols-3 w-full">
            <h2 className="uppercase">{projects[selectedIndex]?.title} {projects[selectedIndex]?.year}</h2>
          </div>
          <h3 className="self-start uppercase text-xs">{projects[selectedIndex]?.desc}</h3>
          <h3 className="leading-[0.25px] self-start uppercase text-xs">{projects[selectedIndex]?.work}</h3>
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
                  onImgChange={handleImgChange}
                />
              )
            })
          }
        </div>
      </div>
    </section>
  );
};

const ProjectDiv = ({ project, index, isSelected, onSelected, onImgChange }) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  const handleProjectClick = () => {
    onSelected();
    setSelectedImgIndex(0);
    onImgChange(0);
  }

  const handleImgClick = (i) => {
    setSelectedImgIndex(i)
    onImgChange(i);
  }

  return (
    <>
      <motion.div
        className="text-sm grid grid-cols-3 md:text-lg border-b-[1px] p-2 border-black"
        onClick={handleProjectClick}
        whileHover={{ opacity: 0.4 }}
      >
        <span style={ibm.style}>RV-00{index + 1}</span>
        <span style={barlow.style} className="text-[11px] uppercase md:text-lg">{project.title}</span>
        <span className="justify-self-end">{project.year}</span>
      </motion.div>
      {isSelected &&
        <motion.div
          className="flex flex-col md:flex-row gap-4 my-4"
          key={isSelected}
          initial={{ height: 0 }}
          animate={{ height: '100%', transition: { duration: 0.8 } }}
        >
          {project.imgs.map((img, i) =>
            <ProjectImg key={i} src={img.src} alt={img.alt} isSelectedImg={selectedImgIndex === i} onSelectedImg={() => handleImgClick(i)} />
          )}
        </motion.div>
      }
    </>
  )
}

const ProjectImg = ({ src, alt, isSelectedImg, onSelectedImg, isMain }) => {
  const size = isMain ? 'w-3/4 h-3/4' : 'h-full w-1/2 md:w-60 h-44';
  const scale = isMain ? 'object-contain' : 'object-scale-down';
  const border = isMain ? null : isSelectedImg ? 'border-2 border-current' : 'border border-current';
  const className = `${border} relative aspect-video ${size}`;
  return (
    <div
      onClick={onSelectedImg}
      className={className}>
      <Image fill src={src} alt={alt} className={scale} />
    </div>
  )
}
