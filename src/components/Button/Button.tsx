import styles from './Button.module.css';
import React from 'react';

type Color = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info';
type Variant = 'contained' | 'outlined' | 'text';
type Size = 'small' | 'medium' | 'large';

interface ButtonProps {
  children: React.ReactNode;
  text?: string;
  disabled?: boolean;
  onClick?: () => void;
  color?: Color;
  variant?: Variant;
  size?: Size;
}

const Button: React.FC<ButtonProps> = ({
  children,
  text,
  disabled = false,
  onClick,
  color = 'primary',
  variant = 'contained',
  size = 'small',
}) => {
  const className = [styles.button, color && styles[color], variant && styles[variant], size && styles[size]]
    .filter(Boolean)
    .join(' ');

  const handleClick: () => void = () => onClick && onClick();

  return (
    <button className={className} onClick={handleClick} disabled={disabled}>
      {text || children}
    </button>
  );
};

export {Button};
