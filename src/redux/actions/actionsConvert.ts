import { convert } from '../../api/convert';
import { Dispatch } from 'redux';
import { ICurrency } from '../../models/interfaceIcurrency';
import { ActionTypes } from './actionTypes';
import store from '../store';

export const setFromCurrency = (payload: ICurrency) => ({
  type: ActionTypes.SET_FROM_CURRENCY,
  payload,
});
export const setToCurrency = (payload: ICurrency) => ({
  type: ActionTypes.SET_TO_CURRENCY,
  payload,
});
export const setAmount = (payload: number) => ({
  type: ActionTypes.SET_AMOUNT,
  payload,
});

export const fetchConvert = (
  body?: {
    to: string;
    from: string;
    amount: number;
  }
) => {
  return async (dispatch: Dispatch) => {
    const { fromCurrency, toCurrency, amount } =
      store.getState().convertReducer;

    const convertData = body
      ? body
      : {
          from: fromCurrency.code,
          to: toCurrency.code,
          amount,
        };
    const { data } = await convert(convertData);

    const history = localStorage.getItem('convertHistory')
      ? [
          ...(localStorage.getItem('convertHistory')?.split('|') || []),
          JSON.stringify(convertData),
        ]
      : [JSON.stringify(convertData)];

    localStorage.setItem('convertHistory', history.join('|'));
    window.dispatchEvent(new Event('storage'));

    dispatch({
      type: ActionTypes.FETCH_CONVERT,
      payload: {
        from: { ...fromCurrency, value: amount },
        to: { ...toCurrency, value: data.result },
        rate: data.info.rate,
      },
    });
  };
};


export const swapCurrency = ()=>({ type:ActionTypes.SET_SWAP_CURRENCY})