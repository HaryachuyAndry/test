import React, { useState } from 'react';
import { timeSeries } from '../../api/timeseries';
import CurrencySelector from '../../components/CurrencySelector/CurrencySelector';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomCalendar from '../../components/CustomCalendar/CustomCalendar';
import { currencyList } from '../../constans/currencyList';
import { ICurrency } from '../../models/interfaceIcurrency';
import styles from './styles.module.scss';

interface IResponse {
  arrRes: Array<[string, number | unknown]>;
  currency: string;
}

function Comparison() {
  const [baseCurrency, setBaseCurrency] = useState<ICurrency>(currencyList[0]);
  const [currency, setCurrency] = useState<ICurrency>(currencyList[0]);
  const [response, setResponse] = useState<IResponse>();
  const [rangeDate, setRangeDate] = useState<Array<Date>>([
    new Date(),
    new Date(),
  ]);

  const fetchComparison = async () => {
    const { data } = await timeSeries({
      startDate: rangeDate[0],
      endDate: rangeDate[1],
      base: baseCurrency.code,
      currency: currency.code,
    });
    console.log(data);
    const arrRes: Array<[string, number | unknown]> = Object.keys(
      data.rates
    ).map((key) => [key, Object.values(data.rates[key])[0]]);
    setResponse({ arrRes, currency: currency.code });
  };

  return (
    <div className={styles.comparison}>
      <div className={styles.comparison__dateBlock}>
        <span className={styles.comparison__dateBlock__title}>Range</span>
        <CustomCalendar
          range={true}
          onChange={(v) => {
            Array.isArray(v) && setRangeDate(v);
          }}
        />
      </div>
      <div className={styles.comparison__selectors}>
        <div className={styles.comparison__itemSelector}>
          <span>base currency</span>
          <CurrencySelector
            value={baseCurrency}
            onChangeValue={(v) => {
              setBaseCurrency(v);
            }}
          />
        </div>
        <div className={styles.comparison__itemSelector}>
          <span>current currency</span>
          <CurrencySelector
            value={currency}
            onChangeValue={(v) => {
              setCurrency(v);
            }}
          />
        </div>
        <CustomButton
          text="Send"
          onClick={() => {
            fetchComparison();
          }}
        />
      </div>
      <div className={styles.comparison__content}>
        {response?.arrRes.map((item) => (
          <span
            className={styles.comparison__content__item}
            key={item[0]}
          >{`${item[0]}: ${item[1]}`}</span>
        ))}
      </div>
    </div>
  );
}

export default Comparison;
