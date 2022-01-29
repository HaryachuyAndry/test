import { convert } from '../../api/convert';
import { Dispatch } from 'redux';
import { ICurrency } from '../../models/interfaceIcurrency';
import { ActionTypesConvert } from './actionTypes';
import store from '../store';

export const setFromCurrency = (payload: ICurrency) => ({
  type: ActionTypesConvert.SET_FROM_CURRENCY,
  payload,
});
export const setToCurrency = (payload: ICurrency) => ({
  type: ActionTypesConvert.SET_TO_CURRENCY,
  payload,
});
export const setAmount = (payload: number) => ({
  type: ActionTypesConvert.SET_AMOUNT,
  payload,
});

export const fetchConvert = () => {
  return async (dispatch: Dispatch) => {
    const { fromCurrency, toCurrency, amount } =
      store.getState().convertReducer;

    const { data } = await convert({
      from: fromCurrency.code,
      to: toCurrency.code,
      amount,
    });

    const history = localStorage.getItem('convertHistory')
      ? [
          ...(localStorage.getItem('convertHistory')?.split('|') || []),
          JSON.stringify({
            fromCurrency,
            toCurrency,
            amount,
            result: data.result,
            date: new Date(),
          }),
        ]
      : [
          JSON.stringify({
            fromCurrency,
            toCurrency,
            amount,
            result: data.result,
            date: new Date(),
          }),
        ];

    localStorage.setItem('convertHistory', history.join('|'));
    window.dispatchEvent(new Event('storage'));

    dispatch({
      type: ActionTypesConvert.FETCH_CONVERT,
      payload: {
        from: { ...fromCurrency, value: amount },
        to: { ...toCurrency, value: data.result },
        rate: data.info.rate,
      },
    });
  };
};

export const swapCurrency = () => ({
  type: ActionTypesConvert.SET_SWAP_CURRENCY,
});
