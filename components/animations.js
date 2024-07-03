export const height = {
  initial: { height: 0 },
  enter: {
    height: "100vh",
    transition: { duration: 1, ease: [0.34, 1.56, 0.64, 1] },
  },
  exit: { height: 0, transition: { duration: 1, ease: [0.5, 0, 0.75, 0] } },
};

export const fadeIn = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 2 }, delay: 8 },
  exit: { opacity: 0 },
};

export const slide = {
  initial: { x: "-150%" },
  enter: (i) => ({
    x: 0,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
  exit: (i) => ({
    x: "-150%",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
};

export const opacity = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const homeTitle = {
  initial: { opacity: 0, y: 100 },
  enter: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "circOut", delay: 0.2 * i + 1 },
  }),
};

export const homeImages = {
  initial: { opacity: 0, x: 50 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadedTitles = {
  initial: { opacity: 0.5 },
  hovered: { opacity: 1, transition: { duration: 0.5 } },
  notHovered: { opacity: 0.5, transition: { duration: 0.7 } },
};
