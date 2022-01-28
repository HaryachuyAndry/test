import React, { useState } from 'react';
import CurrencySelector from '../../components/CurrencySelector/CurrencySelector';
import { currencyList } from '../../constans/currencyList';
import { ICurrency } from '../../models/interfaceIcurrency';
import styles from './styles.module.scss';
import 'react-calendar/dist/Calendar.css';
import { historicalRates } from '../../api/historicalRates';
import CustomCalendar from '../../components/CustomCalendar/CustomCalendar';
import CustomButton from '../../components/CustomButton/CustomButton';

interface IResponse {
  base: string;
  rates: Array<[string, number]>;
}

function Historical() {
  const [fromCurrency, setFromCurrency] = useState<ICurrency>(currencyList[0]);
  const [dateFrom, setDateFrom] = useState<Date>(new Date());
  const [result, setResult] = useState<IResponse>();

  const fetchConvert = async () => {
    const { data } = await historicalRates({
      date: dateFrom,
      currency: fromCurrency.code,
    });
    const arrResults: Array<[string, number]> = Object.keys(data.rates).map(
      (key) => [key, data.rates[key]]
    );
    setResult({ base: data.base, rates: arrResults });
  };

  return (
    <div className={styles.historical}>
      <CustomCalendar
        onChange={(v) => {
          !Array.isArray(v) && setDateFrom(v);
        }}
      />
      <div className={styles.historical__middleBlock}>
        <CurrencySelector
          value={fromCurrency}
          onChangeValue={setFromCurrency}
        />
        <div className={styles.historical__middleBlock__button}>
          <CustomButton text="Check" onClick={fetchConvert} />
        </div>
      </div>

      <div className={styles.historical__result}>
        {result &&
          result.rates.map((item: [string, number]) => (
            <span
              className={styles.historical__result__item}
              key={item[0]}
            >{`${item[0]}: \n\n ${item[1]}`}</span>
          ))}
      </div>
    </div>
  );
}

export default Historical;
