import React from 'react';
import { useDispatch } from 'react-redux';
import CurrencySelector from '../../components/CurrencySelector/CurrencySelector';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomCalendar from '../../components/CustomCalendar/CustomCalendar';
import CustomChart from '../../components/CustomChart/CustomChart';
import { useTypedSelector } from '../../hooks';
import {
  fetchChart,
  setChartBaseCurrency,
  setChartCurrentCurrency,
  setChartRangeDate,
} from '../../redux/actions/actionChart';
import styles from './styles.module.scss';

function Chart() {
  const dispatch = useDispatch();

  const { baseCurrency, currentCurrency, response } = useTypedSelector(
    (state) => state.chartReducer
  );

  return (
    <div className={styles.chart}>
      <div className={styles.chart__dateBlock}>
        <span className={styles.chart__dateBlock__title}>Range</span>
        <CustomCalendar
          range={true}
          onChange={(v) => {
            Array.isArray(v) && dispatch(setChartRangeDate(v));
          }}
        />
      </div>
      <div className={styles.chart__selectors}>
        <CurrencySelector
          value={baseCurrency}
          label="Base currency"
          onChangeValue={(v) => {
            dispatch(setChartBaseCurrency(v));
          }}
        />

        <CurrencySelector
          value={currentCurrency}
          label="Current currency"
          onChangeValue={(v) => {
            dispatch(setChartCurrentCurrency(v));
          }}
        />

        <CustomButton
          text="Send"
          onClick={() => {
            dispatch(fetchChart());
          }}
        />
      </div>
      <div className={styles.chart__content}>
        {response && (
          <CustomChart
            code={response.currency}
            arrResponse={response?.arrRes.map((item) => ({
              date: item[0],
              value: item[1],
            }))}
          />
        )}
      </div>
    </div>
  );
}

export default Chart;
