import React from 'react';
import CurrencySelector from '../../components/CurrencySelector/CurrencySelector';
import styles from './styles.module.scss';
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from '../../components/CustomCalendar/CustomCalendar';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useTypedSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import {
  fetchHistoryConvert,
  setHistoryCurrency,
  setHistoryDate,
} from '../../redux/actions/actionHistorical';

function Historical() {
  const { currency, result } = useTypedSelector(
    (state) => state.historyReducer
  );

  const dispatch = useDispatch();

  return (
    <div className={styles.historical}>
      <CustomCalendar
        onChange={(v) => {
          !Array.isArray(v) && dispatch(setHistoryDate(v));
        }}
      />
      <div className={styles.historical__middleBlock}>
        <CurrencySelector
          value={currency}
          onChangeValue={(v) => dispatch(setHistoryCurrency(v))}
        />
        <div className={styles.historical__middleBlock__button}>
          <CustomButton
            text="Check"
            onClick={() => {
              dispatch(fetchHistoryConvert());
            }}
          />
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
