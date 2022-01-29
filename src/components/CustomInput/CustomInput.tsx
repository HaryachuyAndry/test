import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './styles.module.scss';

interface ICustomInput {
  symbol?: string;
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

function CustomInput({ symbol, value, onChange, label }: ICustomInput) {
  const [focus, setFocus] = useState<boolean>(false);
  const [text, setText] = useState<string>('1');

  return (
    <div className={styles.container}>
      <span className={styles.container__title}>{label}</span>
      <label
        className={clsx(
          styles.container__label,
          focus && styles.container__label_focus
        )}
      >
        <span>{symbol}</span>
        <input
          type={'number'}
          value={text}
          className={styles.container__label__input}
          onChange={(v) => {
            onChange(+v.target.value);
            setText(v.target.value);
          }}
          onBlur={() => {
            if (!text?.length) {
              onChange(1);
              setText('1');
            }
            setFocus(false);
          }}
          onFocus={() => {
            setFocus(true);
          }}
        />
      </label>
    </div>
  );
}

export default CustomInput;
