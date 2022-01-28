import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './styles.module.scss';

interface ICustomInput {
  symbol?: string;
  value: number;
  onChange: (value: number) => void;
}

function CustomInput({ symbol, value, onChange }: ICustomInput) {
  const [focus, setFocus] = useState<boolean>(false);
  const [text, setText] = useState<string>('1');

  return (
    <label className={clsx(styles.container, focus && styles.container_focus)}>
      <span>{symbol}</span>
      <input
        type={'number'}
        value={text}
        className={styles.container__input}
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
  );
}

export default CustomInput;
