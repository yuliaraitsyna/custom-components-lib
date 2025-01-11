import React, {type ButtonHTMLAttributes, useRef, useState} from 'react';
import styles from './Checkbox.module.css';
import tickImage from '/src/assets/icons/tick.svg';

interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  checked?: boolean;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({checked, label, required, ...props}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const labelText = required ? `${label}*` : label;
  const tickClassname = [styles.tickIcon, isChecked && styles.checked].filter(Boolean).join(' ');
  const checkboxClassName = [styles.checkbox, isChecked && styles.checked].filter(Boolean).join(' ');

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setIsChecked(prev => !prev);

    if (props.onChange) {
      const changeEvent = {
        ...event,
        target: buttonRef.current,
        currentTarget: buttonRef.current,
      } as React.ChangeEvent<HTMLButtonElement>;
      props.onChange(changeEvent);
    }
  };

  return (
    <>
      <button ref={buttonRef} className={checkboxClassName} onClick={handleButtonClick} {...props}>
        <img src={tickImage} alt="Tick Icon" className={tickClassname} />
      </button>
      <label className={styles.label}>{labelText}</label>
    </>
  );
};

export {Checkbox};
