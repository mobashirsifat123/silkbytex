import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-accent-400 text-bg-primary font-medium hover:brightness-110 shadow-[var(--shadow-button-base)] hover:shadow-[var(--shadow-button-hover)]',
  secondary:
    'bg-bg-surface text-fg-primary font-medium border border-border hover:border-border-hover hover:bg-bg-elevated',
  ghost:
    'bg-transparent text-fg-primary font-medium border border-border hover:border-fg-muted hover:bg-bg-surface',
  text: 'bg-transparent text-fg-secondary font-medium hover:text-fg-primary',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-4 py-2 text-sm rounded-[var(--radius-sm)]',
  md: 'px-6 py-3 text-sm rounded-[var(--radius-sm)]',
  lg: 'px-10 py-4 text-base rounded-[var(--radius-md)]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  onClick,
  className = '',
  icon,
  disabled = false,
}: ButtonProps) {
  const classes = `focus-ring group inline-flex items-center justify-center gap-2 transition-all duration-[var(--duration-interaction-smooth)] ease-[var(--ease-out)] cursor-pointer select-none ${variantStyles[variant]} ${sizeStyles[size]} ${
    disabled ? 'opacity-40 pointer-events-none' : ''
  } ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
      >
        {children}
        {icon && <span className="ml-1 transition-transform duration-[var(--duration-interaction-fast)] ease-[var(--ease-out)] group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">{icon}</span>}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
      {icon && <span className="ml-1 transition-transform duration-[var(--duration-interaction-fast)] ease-[var(--ease-out)] group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">{icon}</span>}
    </button>
  );
}
