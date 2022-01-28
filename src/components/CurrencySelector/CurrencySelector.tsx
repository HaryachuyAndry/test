import clsx from 'clsx';
import React, { useState } from 'react';
import { currencyList } from '../../constans/currencyList';
import { ICurrency } from '../../models/interfaceIcurrency';
import styles from './styles.module.scss';

interface ICurrencySelector {
  value: ICurrency;
  onChangeValue: (value: ICurrency) => void;
}

function CurrencySelector({ value, onChangeValue }: ICurrencySelector) {
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState('');

  return (
    <label
      className={clsx(styles.selector, focus && styles.selector_focus)}
      onClick={() => setFocus(true)}
    >
      <ul className={styles.selector__list}>
        {currencyList
          .filter(
            (item) =>
              item.label.toLowerCase().includes(text.toLowerCase()) ||
              item.code.toLowerCase().includes(text.toLowerCase()) ||
              (text === '' && item)
          )
          .map((item) => (
            <li
              className={styles.selector__list__item}
              key={item.code}
              onMouseDown={() => {
                onChangeValue(item);
              }}
            >
              <span className={styles.selector__list__item__symbol}>
                {item.symbol}
              </span>{' '}
              {` ${item.code} - ${item.label}`}
            </li>
          ))}
      </ul>
      {focus ? (
        <input
          className={styles.selector__input}
          onChange={(v) => {
            setText(v.target.value);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          onFocus={() => {
            setFocus(true);
          }}
        />
      ) : (
        <div className={styles.selector__value}>
          <span className={styles.selector__value__symbol}>
            {`${value.symbol} ${value.code} - `}
          </span>
          {`  ${value.label}`}
        </div>
      )}
    </label>
  );
}

export default CurrencySelector;
