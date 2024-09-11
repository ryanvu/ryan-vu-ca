"use client";

import { useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export const useScrollBasedImage = (images, containerRef) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef });

  useEffect(() => {

    const updateIndex = (value) => {
      const index = Math.min(Math.floor(value * images.length), images.length - 1);
      setCurrentImageIndex(index);
    }

    const unsubscribe = scrollYProgress.on('change', updateIndex);

    return () => unsubscribe();
  }, [scrollYProgress, images]);

return { currentImage: images[currentImageIndex], scrollYProgress };
};
