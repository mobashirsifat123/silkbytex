// Animation timing tokens (milliseconds)
export const TIMING = {
  instant: 100,
  fast: 200,
  normal: 400,
  smooth: 600,
  cinematic: 900,
  epic: 1400,
} as const;

export const SECTION_ANIMATION = {
  duration: 0.65,
  stagger: 0.1,
  delayChildren: 0.08,
  parallaxDistance: 24,
} as const;

export const REVEAL_RHYTHM = {
  headingDelay: 0,
  descriptionDelay: 0.14,
  itemsDelay: 0.26,
  itemStagger: 0.1,
} as const;

// Easing curves for Framer Motion (cubic-bezier arrays)
export const EASING = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  elastic: [0.34, 1.56, 0.64, 1] as const,
  snap: [0.77, 0, 0.175, 1] as const,
} as const;

// CSS easing equivalents
export const CSS_EASING = {
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  elastic: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  snap: 'cubic-bezier(0.77, 0, 0.175, 1)',
} as const;

// ── Framer Motion Variants ──

export const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: SECTION_ANIMATION.duration, ease: EASING.out },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: SECTION_ANIMATION.duration, ease: EASING.out },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: SECTION_ANIMATION.duration, ease: EASING.out },
  },
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: SECTION_ANIMATION.duration, ease: EASING.out },
  },
};

export const clipReveal = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.9, ease: EASING.inOut },
  },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: SECTION_ANIMATION.duration, ease: EASING.out },
  },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: SECTION_ANIMATION.duration, ease: EASING.out },
  },
};

export const slideFrom = {
  left: slideFromLeft,
  right: slideFromRight,
  up: fadeUp,
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: SECTION_ANIMATION.stagger,
      delayChildren: SECTION_ANIMATION.delayChildren,
    },
  },
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: SECTION_ANIMATION.stagger + 0.04,
      delayChildren: SECTION_ANIMATION.delayChildren + 0.04,
    },
  },
};

export const sectionStagger = staggerContainer;

export const sectionHeaderStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: SECTION_ANIMATION.stagger,
      delayChildren: REVEAL_RHYTHM.headingDelay,
    },
  },
};

export const sectionDescriptionReveal = {
  hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: SECTION_ANIMATION.duration,
      ease: EASING.out,
      delay: REVEAL_RHYTHM.descriptionDelay,
    },
  },
};

export const sectionItemsStagger = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: REVEAL_RHYTHM.itemsDelay,
      staggerChildren: REVEAL_RHYTHM.itemStagger,
    },
  },
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING.out },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: EASING.inOut },
  },
};

// Viewport settings for whileInView
export const defaultViewport = {
  once: true,
  margin: '-15% 0px -15% 0px' as string,
};
