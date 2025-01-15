import {useEffect, useRef, useState, type InputHTMLAttributes} from 'react';
import type {InputType} from '../../types/types';
import React from 'react';

import styles from './TextField.module.css';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  type?: InputType;
}

const TextField: React.FC<TextFieldProps> = ({error, helperText, placeholder, required, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const textFieldClassName = [styles.textField, error && styles.error].filter(Boolean).join(' ');
  const labelClassName = [styles.label, isFocused && styles.focused, error && styles.error].filter(Boolean).join(' ');
  const helperTextClassName = [styles.helperText, error && styles.error].filter(Boolean).join(' ');

  const labelText = required && placeholder ? `${placeholder}*` : placeholder;

  useEffect(() => {
    if (props.value) {
      setIsFocused(true);
    }
  }, [props.value]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    setIsFocused(true);
    props.onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (inputRef.current && inputRef.current.value === '') {
      setIsFocused(false);
    }
    props.onBlur?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      inputRef.current?.blur();
    }

    props.onKeyDown?.(event);
  };

  return (
    <>
      <div className={styles.container}>
        <label className={labelClassName}>{labelText}</label>
        <input
          {...props}
          ref={inputRef}
          type={props.type ?? 'text'}
          className={textFieldClassName}
          placeholder={''}
          onFocus={e => handleFocus(e)}
          onBlur={e => handleBlur(e)}
          onKeyDown={e => handleKeyDown(e)}
          required={required}
          role="textbox"
        />
        <span className={helperTextClassName}>{helperText ?? ' '}</span>
      </div>
    </>
  );
};

export {TextField};
