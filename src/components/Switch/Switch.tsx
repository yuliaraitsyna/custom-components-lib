import './Switch.module.css';
import styles from './Switch.module.css';

import type {ChangeEvent, InputHTMLAttributes} from 'react';
import React, {useState} from 'react';
import clsx from 'clsx';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({label, ...props}) => {
  const [isChecked, setIsChecked] = useState<boolean>(!!props.checked);

  const labelText = props.required && label ? `${label}*` : label;

  const labelClassName = clsx(styles.label, props.disabled && styles.diabled);
  const switchClassName = clsx('switch', props.className);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(prev => !prev);
    props.onChange?.(event);
  };

  return (
    <div className={'container'}>
      <label className={switchClassName}>
        <input {...props} type="checkbox" onChange={handleChange} checked={isChecked} role="switch"></input>
        <span className={'slider'}></span>
      </label>
      <label className={labelClassName}>{labelText}</label>
    </div>
  );
};

export {Switch};
