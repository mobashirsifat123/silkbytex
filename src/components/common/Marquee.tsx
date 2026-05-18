'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for one full scroll
  className?: string;
}

export default function Marquee({ items, speed = 25, className = '' }: MarqueeProps) {
  const reduceMotion = useReducedMotion();

  // Create a continuous array by repeating the items
  const duplicatedItems = [...items, ...items, ...items];

  if (reduceMotion) {
    return (
      <div className={`${className} flex flex-wrap gap-8 p-8 overflow-hidden`}>
        {items.map((item, index) => (
          <span key={index} className="hm-marquee__item">
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`${className} overflow-hidden flex relative`} aria-hidden="true">
      <motion.div
        className="hm-marquee-track flex whitespace-nowrap"
        animate={{
          x: ['0%', '-33.333333%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="hm-marquee__item">{item}</span>
            <span className="hm-marquee__sep">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
