'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface TextRevealProps {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  id?: string;
  baseDelay?: number;
  stagger?: number;
}

export default function TextReveal({
  lines,
  as: Component = 'p',
  className = '',
  id,
  baseDelay = 0,
  stagger = 0.1,
}: TextRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Component className={className} id={id}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={reduceMotion ? false : { y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{
              duration: 0.8,
              delay: baseDelay + index * stagger,
              ease: [0.16, 1, 0.3, 1], // Custom premium ease
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
