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

  const selectRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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

  const handleOpenClick = (): void => {
    setIsOpen(!isOpen);

    if (selectRef.current && selectRef.current.value === '') {
      setIsFocused(false);
    }

    isFocused ? selectRef.current?.blur() : selectRef.current?.focus();
  };

  const handleOptionClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    const value = event.currentTarget.textContent;

    if (!value) {
      setIsFocused(false);
    }

    if (selectRef.current) {
      selectRef.current.value = value;
    }

    const changeEvent = {
      target: {value},
    } as React.ChangeEvent<HTMLInputElement>;

    props.onChange?.(changeEvent);

    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <label className={labelClassName}>{labelText ?? ' '}</label>
      <input ref={selectRef} className={styles.select} onFocus={handleFocus} onBlur={null} readOnly={true} {...props} />
      <button ref={buttonRef} className={styles.arrow} onClick={handleOpenClick}>
        {isOpen ? '▲' : '▼'}
      </button>
      {!isOpen && <span className={styles.helperText}>{helperText}</span>}
      <div className={optionsClassName}>
        <ul>
          {React.Children.map(children, child =>
            React.isValidElement(child) ? (
              <li key={uuidv4()} onClick={e => handleOptionClick(e)}>
                {child}
              </li>
            ) : null,
          )}
        </ul>
      </div>
    </div>
  );
};

export {Select};
