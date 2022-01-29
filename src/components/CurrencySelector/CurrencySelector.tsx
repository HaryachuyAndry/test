import clsx from 'clsx';
import React, { useState } from 'react';
import ICONS from '../../assets/icons';
import { currencyList } from '../../constans/currencyList';
import { ICurrency } from '../../models/interfaceIcurrency';
import styles from './styles.module.scss';

interface ICurrencySelector {
  value: ICurrency;
  onChangeValue: (value: ICurrency) => void;
  label?: string;
}

function CurrencySelector({ value, onChangeValue, label }: ICurrencySelector) {
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState('');

  return (
    <div className={styles.selector}>
      <span className={styles.selector__label}>{label}</span>

      <label
        className={clsx(
          styles.selector__container,
          focus && styles.selector_focus
        )}
        onClick={() => setFocus(true)}
      >
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
        <div className={styles.selector__arrow}>{ICONS.utils.arrow}</div>
      </label>

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
                setFocus(false);
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
    </div>
  );
}

export default CurrencySelector;
