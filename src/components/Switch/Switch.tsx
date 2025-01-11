import type {InputHTMLAttributes} from 'react';

import styles from './Switch.module.css';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked?: boolean;
}

const Switch: React.FC<SwitchProps> = ({label, ...props}) => {
  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        <input type="checkbox" {...props}></input>
        <span className={styles.slider}></span>
      </label>
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export {Switch};
