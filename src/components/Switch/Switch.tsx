import type {ChangeEvent, InputHTMLAttributes} from 'react';
import React, {useState} from 'react';

import styles from './Switch.module.css';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({label, ...props}) => {
  const [isChecked, setIsChecked] = useState<boolean>(!!props.checked);

  const labelText = props.required ? `${label}*` : label;

  const labelClassName = [styles.label, props.disabled && styles.disabled].filter(Boolean).join(' ');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(prev => !prev);
    props.onChange?.(event);
  };

  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        <input {...props} type="checkbox" onChange={e => handleChange(e)} checked={isChecked}></input>
        <span className={styles.slider}></span>
      </label>
      <label className={labelClassName}>{labelText}</label>
    </div>
  );
};

export {Switch};
