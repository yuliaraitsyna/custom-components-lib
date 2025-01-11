import React, {type ButtonHTMLAttributes, useRef, useState} from 'react';
import styles from './Checkbox.module.css';
import tickImage from '/src/assets/icons/tick.svg';

interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  checked?: boolean;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({checked, label, required, disabled, ...props}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const labelText = required ? `${label}*` : label;

  const tickClassname = [styles.tickIcon, isChecked && styles.checked].filter(Boolean).join(' ');
  const checkboxClassName = [styles.checkbox, isChecked && styles.checked, disabled && styles.disabled]
    .filter(Boolean)
    .join(' ');
  const labelClassName = [styles.label, disabled && styles.disabled].filter(Boolean).join(' ');

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (disabled) return;

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
      <label className={labelClassName}>{labelText}</label>
    </>
  );
};

export {Checkbox};
