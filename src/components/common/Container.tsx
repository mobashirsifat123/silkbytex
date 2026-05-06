import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'default' | 'narrow' | 'wide';
}

const maxWidthMap = {
  narrow: 'max-w-4xl',
  default: 'max-w-7xl',
  wide: 'max-w-[1440px]',
};

export default function Container({
  children,
  className = '',
  maxWidth = 'default',
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 md:px-10 lg:px-16 ${maxWidthMap[maxWidth]} ${className}`}
    >
      {children}
    </div>
  );
}
