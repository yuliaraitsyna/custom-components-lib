import React from 'react';
import type {ButtonHTMLAttributes} from 'react';

import styles from './Button.module.css';

type Color = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info';
type Variant = 'contained' | 'outlined' | 'text';
type Size = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
  variant?: Variant;
  size?: Size;
}

const Button: React.FC<ButtonProps> = ({color = 'primary', variant = 'contained', size = 'small', ...props}) => {
  const className = [styles.button, styles[color], styles[variant], styles[size]].filter(Boolean).join(' ');

  return (
    <button className={className} {...props}>
      {props.children}
    </button>
  );
};

export {Button};
