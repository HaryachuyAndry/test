import React from 'react';
import { useDispatch } from 'react-redux';
import CurrencySelector from '../../components/CurrencySelector/CurrencySelector';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomCalendar from '../../components/CustomCalendar/CustomCalendar';
import { useTypedSelector } from '../../hooks';
import {
  fetchComparison,
  setComparisonBaseCurrency,
  setComparisonCurrentCurrency,
  setComparisonRangeDate,
} from '../../redux/actions/actionComparison';
import styles from './styles.module.scss';

function Comparison() {
  const dispatch = useDispatch();

  const { baseCurrency, currentCurrency, response } = useTypedSelector(
    (state) => state.comparisonReducer
  );

  return (
    <div className={styles.comparison}>
      <div className={styles.comparison__dateBlock}>
        <span className={styles.comparison__dateBlock__title}>Range</span>
        <CustomCalendar
          range={true}
          onChange={(v) => {
            Array.isArray(v) && dispatch(setComparisonRangeDate(v));
          }}
        />
      </div>
      <div className={styles.comparison__selectors}>
        <CurrencySelector
          label="Base currency"
          value={baseCurrency}
          onChangeValue={(v) => {
            dispatch(setComparisonBaseCurrency(v));
          }}
        />

        <CurrencySelector
          label="Current currency"
          value={currentCurrency}
          onChangeValue={(v) => {
            dispatch(setComparisonCurrentCurrency(v));
          }}
        />

        <CustomButton
          text="Send"
          onClick={() => {
            dispatch(fetchComparison());
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
