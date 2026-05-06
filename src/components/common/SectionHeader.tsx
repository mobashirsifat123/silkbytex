import React from 'react';

interface SectionHeaderProps {
  overline: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  overline,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      <span className="text-overline text-accent-400">
        {overline}
      </span>
      <h2 className="text-heading-1">{title}</h2>
      {description && (
        <p className="text-body-lg text-fg-secondary max-w-[55ch]">
          {description}
        </p>
      )}
    </div>
  );
}
