
import { Dispatch } from 'redux';
import { ICurrency } from '../../models/interfaceIcurrency';
import { ActionTypesConvert, ActionTypesHistory } from './actionTypes';
import store from '../store';
import { historicalRates } from '../../api/historicalRates';

export const setHistoryCurrency = (payload: ICurrency) => ({
  type: ActionTypesHistory.SET_HISTORY_CURRENCY,
  payload
});

export const setHistoryDate = (payload: Date) => ({
  type: ActionTypesHistory.SET_HISTORY_DATE,
  payload
});


export const fetchHistoryConvert = () => {
  return async (dispatch: Dispatch) => {
      const { date, currency } = store.getState().historyReducer
      const { data } = await historicalRates({ date,currency:currency.code })

      const rates: Array<[string, number]> = Object.keys(data.rates).map(
        (key) => [key, data.rates[key]]
      );

    dispatch({
      type: ActionTypesHistory.FETCH_HISTORY_DATA,
      payload: { base: data.base, rates },
    });
  };
};


export const swapCurrency = ()=>({ type:ActionTypesConvert.SET_SWAP_CURRENCY })