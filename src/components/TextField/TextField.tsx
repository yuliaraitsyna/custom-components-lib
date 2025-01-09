import {useEffect, useRef, useState, type InputHTMLAttributes} from 'react';
import React from 'react';

import styles from './TextField.module.css';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const TextField: React.FC<TextFieldProps> = ({error, helperText, placeholder, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const textFieldClassName = [styles.textField, error && styles.error].filter(Boolean).join(' ');
  const labelClassName = [styles.label, isFocused && styles.focused, error && styles.error].filter(Boolean).join(' ');

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

  return (
    <div className={styles.container}>
      <label className={labelClassName}>{placeholder}</label>
      <input
        ref={inputRef}
        className={textFieldClassName}
        placeholder={''}
        onFocus={e => handleFocus(e)}
        onBlur={e => handleBlur(e)}
        {...props}
      />
      <span>{helperText}</span>
    </div>
  );
};

export {TextField};
