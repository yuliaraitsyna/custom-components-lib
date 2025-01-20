import './Select.module.css';
import styles from './Select.module.css';

import {useCallback, useEffect, useLayoutEffect, useRef, useState, type SelectHTMLAttributes} from 'react';
import {v4 as uuidv4} from 'uuid';
import React from 'react';
import clsx from 'clsx';

interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({label, helperText, children, ...props}) => {
  const [isFocusedLabel, setIsFocusedLabel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLInputElement | null>(null);

  const selectClassName = clsx('select', props.className);
  const labelClassName = clsx(styles.label, isFocusedLabel && styles.focused);
  const optionsClassName = clsx('options', isOpen && 'open');

  const labelText = props.required && label ? `${label}*` : label;

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

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>): void => {
      setIsOpen(true);
      props.onFocus?.(event);
    },
    [setIsOpen, props.onFocus],
  );

  const handleOpenClick = useCallback((): void => {
    isOpen ? selectRef.current?.blur() : selectRef.current?.focus();
  }, [selectRef, isOpen]);

  const handleOptionClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>): void => {
      const value = event.currentTarget.textContent;

      if (selectRef.current) {
        selectRef.current.value = value;
      }

      const changeEvent = {
        target: {value},
      } as React.ChangeEvent<HTMLInputElement>;

      props.onChange?.(changeEvent);
    },
    [props.onChange, selectRef],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>): void => {
      setIsOpen(false);
      props.onBlur?.(event);
    },
    [setIsOpen, props.onBlur],
  );

  const handleMouseDown = useCallback((event: React.MouseEvent): void => {
    event.preventDefault();
  }, []);

  return (
    <div className={styles.container}>
      <label className={labelClassName}>{labelText ?? ' '}</label>
      <input
        {...props}
        ref={selectRef}
        className={selectClassName}
        onFocus={handleFocus}
        onBlur={handleBlur}
        readOnly={true}
        role="input"
      />
      <span className={styles.helperText}>{helperText ?? ' '}</span>
      <div className={optionsClassName} role="menu">
        <ul>
          {React.Children.map(children, child => (
            <li key={uuidv4()} onMouseDown={handleOptionClick}>
              {child}
            </li>
          ))}
        </ul>
      </div>
      <button className={styles.arrow} onClick={handleOpenClick} onMouseDown={handleMouseDown}>
        {isOpen ? '▲' : '▼'}
      </button>
    </div>
  );
};

export {Select};
