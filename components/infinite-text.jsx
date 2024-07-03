"use client";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Oswald } from 'next/font/google';

const oswald = Oswald({ subsets: ["latin"] });

export const InfiniteText = ({ text }) => {
  const firstText = useRef(null);
  const secondText = useRef(null);

  let xPercent = 0;
  let direction = 1;

  useEffect(() => {
    requestAnimationFrame(animate);
  }, [])

  const animate = () => {
    if(xPercent < -100){
      xPercent = 0;
    }
    else if(xPercent > 0){
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent })
    gsap.set(secondText.current, { xPercent: xPercent })

    requestAnimationFrame(animate);
    xPercent += 0.05 * direction;
  }

  return (
    <div className="sliderContainer">
      <div style={ oswald.style } className="slider border-y-[1px] border-black uppercase">
        <p ref={firstText}>{text}</p>
        <p ref={secondText}>{text}</p>
      </div>
    </div>
  )
}
