import React from 'react';
import type {ButtonHTMLAttributes} from 'react';
import type {Color, Size, Variant} from '../../types/types';
import clsx from 'clsx';

import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({color = 'primary', variant = 'contained', size = 'small', ...props}) => {
  const className = clsx('button', styles.button, color, variant, size, props.className);

  return (
    <button className={className} {...props}>
      {props.children}
    </button>
  );
};

export {Button};
