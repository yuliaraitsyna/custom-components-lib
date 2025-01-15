import React from 'react';
import type {ButtonHTMLAttributes} from 'react';
import type {Color, Size, Variant} from '../../types/types';

import styles from './Button.module.css';

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

export default Button;
