import {useLayoutEffect, useRef, useState, type SelectHTMLAttributes} from 'react';
import {v4 as uuidv4} from 'uuid';
import React from 'react';

import styles from './Select.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

const Select: React.FC<SelectProps> = ({label, helperText, children, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const selectRef = useRef<HTMLInputElement | null>(null);
  // const selectedOptionRef = useRef<HTMLLIElement | null>(null);

  const labelClassName = [styles.label, isFocused && styles.focused].filter(Boolean).join(' ');
  const optionsClassName = [styles.options, isOpen && styles.open].filter(Boolean).join(' ');

  const labelText = props.required ? `${label}*` : label;

  useLayoutEffect(() => {
    if (selectRef.current && labelText) {
      selectRef.current.style.width = `${labelText.length + 100}px`;
      selectRef.current.value = '';
    }
  }, [labelText]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    setIsFocused(true);
    setIsOpen(true);
    props.onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (selectRef.current && selectRef.current.value === '') {
      setIsFocused(false);
    }
    setIsOpen(false);
    props.onBlur?.(event);
  };

  // const handleOptionHover = () => {
  //     //implement hover on option to display in input and then onChange for "select"
  // }

  // const handleOptionClick = (optionValue: string, optionElement: HTMLLIElement) => {

  // };

  return (
    <div className={styles.container}>
      <label className={labelClassName}>{labelText ?? ' '}</label>
      <input
        ref={selectRef}
        className={styles.select}
        onFocus={handleFocus}
        onBlur={handleBlur}
        readOnly={true}
        {...props}
      />
      {!isOpen && <span className={styles.helperText}>{helperText}</span>}
      <div className={optionsClassName}>
        <ul>
          {React.Children.map(children, child =>
            React.isValidElement(child) ? <li key={uuidv4()}>{child}</li> : null,
          )}
        </ul>
      </div>
    </div>
  );
};

export {Select};
