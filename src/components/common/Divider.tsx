import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  glow?: boolean;
  className?: string;
}

export default function Divider({
  orientation = 'horizontal',
  glow = false,
  className = '',
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        className={`w-px self-stretch ${className}`}
        style={{
          background: glow
            ? 'linear-gradient(to bottom, transparent, #22C566, transparent)'
            : 'var(--color-border)',
          boxShadow: glow ? '0 0 20px hsl(152 100% 50% / 0.15)' : 'none',
        }}
      />
    );
  }

  return (
    <div
      className={`h-px w-full ${className}`}
      style={{
        background: glow
          ? 'linear-gradient(to right, transparent, #22C566, transparent)'
          : 'var(--color-border)',
        boxShadow: glow ? '0 0 20px hsl(152 100% 50% / 0.15)' : 'none',
      }}
    />
  );
}
