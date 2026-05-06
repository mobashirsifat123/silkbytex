import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'accent';
  hoverable?: boolean;
  className?: string;
}

const variantClass: Record<string, string> = {
  default: 'glass',
  elevated: 'glass-elevated',
  accent: 'glass-accent',
};

export default function GlassCard({
  children,
  variant = 'default',
  hoverable = false,
  className = '',
}: GlassCardProps) {
  return (
    <div
      className={`${variantClass[variant]} rounded-[var(--radius-xl)] p-6 md:p-8 ring-1 ring-white/5 transition-all duration-[var(--duration-interaction-smooth)] ease-[var(--ease-out)] ${
        hoverable
          ? 'hover:-translate-y-1.5 hover:scale-[1.01] hover:ring-accent-300/20 hover:shadow-glow-card cursor-pointer'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
