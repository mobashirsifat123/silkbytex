'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function RevealSection({
  children,
  className = '',
  id,
  labelledBy,
  delay = 0,
  style,
}: RevealSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      style={style}
      aria-labelledby={labelledBy}
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
