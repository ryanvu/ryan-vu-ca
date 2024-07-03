"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

export default function Photos() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })
  // const x = useTransform(scrollYProgress, [0, 1], [1100, -1100]);
  // const y = useTransform(scrollYProgress, [0, 1], [0, 2000]);


  return (
    <div ref={container} className="flex flex-col">
      {/* <section className="h-screen flex flex-col items-center justify-center"> */}
        {/* <div className="flex flex-row gap-10"> */}
        {/*   <motion.div style={{ x, y }} className="relative z-0 h-[480px] w-[680px] flex flex-col"> */}
        {/*     <Image src="/photos/photos-intro.jpg" fill /> */}
        {/*     <p className="absolute z-10 bottom-[-36px] right-0">TOKYO, JP</p> */}
        {/*   </motion.div> */}
        {/*   <motion.div style={{ x, y }} className="relative z-0 h-[480px] w-[680px]"> */}
        {/*     <Image src="/photos/photos-furusho.jpg" fill /> */}
        {/*     <p className="absolute z-10 bottom-[-36px] right-0">SHIZUOKA, JP</p> */}
        {/*   </motion.div> */}
        {/*   <motion.div style={{ x, y }} className="relative z-0 h-[480px] w-[680px]"> */}
        {/*     <Image src="/photos/photos-shibuya.jpg" fill /> */}
        {/*   </motion.div> */}
        {/*   <motion.div style={{ x, y }} className="relative z-0 h-[480px] w-[680px]"> */}
        {/*     <Image src="/photos/photos-daikanyama.jpg" fill /> */}
        {/*   </motion.div> */}
        {/* </div> */}
      {/* </section > */}
    </div >

  );
}
