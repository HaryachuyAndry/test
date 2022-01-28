/* eslint-disable */

import { currencyList } from "../../constans/currencyList";
import { ICurrency, IResult } from "../../models/interfaceIcurrency";
import { ActionTypes } from "../actions/actionTypes";

interface IInitState{
    fromCurrency:ICurrency,
    toCurrency:ICurrency,
    amount:number,
    result:undefined|IResult
}

interface SetFromCurrencyAction{
    type:ActionTypes.SET_FROM_CURRENCY
    payload:ICurrency
}
interface SetToCurrencyAction{
    type:ActionTypes.SET_TO_CURRENCY
    payload:ICurrency
}
interface SetAmount{
    type:ActionTypes.SET_AMOUNT
    payload:number
}
interface FetchConvert{
    type:ActionTypes.FETCH_CONVERT
    payload:IResult
}
interface SetSwapCurrency{
    type:ActionTypes.SET_SWAP_CURRENCY
}

const initialState: IInitState = {
    fromCurrency:currencyList[0],
    toCurrency:currencyList[1],
    amount:1,
    result:undefined
}

type Action = SetFromCurrencyAction | SetToCurrencyAction | FetchConvert | SetAmount | SetSwapCurrency

const convertReducer = (state = initialState, action:Action): IInitState => { 
    switch (action.type) {
        case ActionTypes.SET_FROM_CURRENCY:
          return {...state, fromCurrency:action.payload}
        case ActionTypes.SET_TO_CURRENCY:
          return {...state, toCurrency:action.payload}
        case ActionTypes.SET_AMOUNT:
          return {...state, amount:action.payload}
        case ActionTypes.FETCH_CONVERT:
            return {...state, result:action.payload}
        case ActionTypes.SET_SWAP_CURRENCY: 
            return {...state, fromCurrency:state.toCurrency, toCurrency:state.fromCurrency}
      default:
        return state;
    }
  };
  
  export default convertReducer;