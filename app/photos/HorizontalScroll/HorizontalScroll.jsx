'use client';
import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

const HorizontalScroll = ({ images, direction }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (scrollRef.current) {
        const totalWidth = scrollRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setWidth(totalWidth - viewportWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [images]);

  const padding = 36;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { stiffness: 100, damping: 50, restDelta: 0.001 };
  
  
  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], direction ? [0, -width - 30] : [-width + padding, padding]),
    springConfig
  );

  const imgVariant = {
    hover: {
      scale: 1.05,
    }
  };

  const spanVariant = {
    initial: { opacity: 0, y: 10 },
    hover: { opacity: 1, y: 0 }
  };

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={scrollRef}
          style={{ x }}
          className="flex h-full items-center absolute top-0 left-0"
        >
          {images.map((img, index) => (
            <motion.div 
              key={index} 
              className="h-[80vh] w-[30vw] flex-shrink-0 mx-4 relative"
              variants={imgVariant}
              initial="initial"
              whileHover="hover"
            >
              <Image
                src={img.src}
                alt={img.alt || `Photography ${index + 1}`}
                layout="fill"
                objectFit="contain"
              />
              <motion.span 
                className="absolute bottom-[-36px] right-4 text-4xl z-60"
                variants={spanVariant}
              >
                { img.location }
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
