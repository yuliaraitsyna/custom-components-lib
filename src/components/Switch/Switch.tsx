import type {InputHTMLAttributes} from 'react';
import React from 'react';

import styles from './Switch.module.css';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({label, ...props}) => {
  const labelText = props.required ? `${label}*` : label;

  const labelClassName = [styles.label, props.disabled && styles.disabled].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        <input type="checkbox" {...props}></input>
        <span className={styles.slider}></span>
      </label>
      <label className={labelClassName}>{labelText}</label>
    </div>
  );
};

export {Switch};
