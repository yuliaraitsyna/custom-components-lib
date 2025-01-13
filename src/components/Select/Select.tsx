import {useEffect, useLayoutEffect, useRef, useState, type SelectHTMLAttributes} from 'react';
import {v4 as uuidv4} from 'uuid';
import React from 'react';

import styles from './Select.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

const Select: React.FC<SelectProps> = ({label, helperText, children, ...props}) => {
  const [isFocusedLabel, setIsFocusedLabel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLInputElement | null>(null);

  const labelClassName = [styles.label, isFocusedLabel && styles.focused].filter(Boolean).join(' ');
  const optionsClassName = [styles.options, isOpen && styles.open].filter(Boolean).join(' ');

  const labelText = props.required ? `${label}*` : label;

  useEffect(() => {
    if (selectRef.current.value || isOpen) {
      setIsFocusedLabel(true);
    } else {
      setIsFocusedLabel(false);
    }
  }, [selectRef.current?.value, isOpen]);

  useLayoutEffect(() => {
    if (selectRef.current && labelText) {
      selectRef.current.style.width = `${labelText.length + 100}px`;
      selectRef.current.value = '';
    }
  }, [labelText]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    setIsOpen(true);
    props.onFocus?.(event);
  };

  const handleOpenClick = (): void => {
    setIsOpen(prev => !prev);
  };

  const handleOptionClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    const value = event.currentTarget.textContent;

    if (selectRef.current) {
      selectRef.current.value = value;
    }

    const changeEvent = {
      target: {value},
    } as React.ChangeEvent<HTMLInputElement>;

    props.onChange?.(changeEvent);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    setIsOpen(false);
    props.onBlur?.(event);
  };

  return (
    <div className={styles.container}>
      <label className={labelClassName}>{labelText ?? ' '}</label>
      <input
        {...props}
        ref={selectRef}
        className={styles.select}
        onFocus={handleFocus}
        onBlur={e => handleBlur(e)}
        readOnly={true}
      />
      <span className={styles.arrow} onClick={handleOpenClick}>
        {isOpen ? '▲' : '▼'}
      </span>
      {isOpen ? (
        <div className={optionsClassName}>
          <ul>
            {React.Children.map(children, child =>
              React.isValidElement(child) ? (
                <li key={uuidv4()} onMouseDown={e => handleOptionClick(e)}>
                  {child}
                </li>
              ) : null,
            )}
          </ul>
        </div>
      ) : (
        <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export {Select};
