/* eslint-disable */ 

import { currencyList } from "../../constans/currencyList";
import { ICurrency } from "../../models/interfaceIcurrency";
import { ActionTypesComparison } from "../actions/actionTypes";

interface IResponse {
    arrRes: Array<[string, number | unknown]>;
    currency: string;
}

interface IInitialState {
    baseCurrency:ICurrency,
    currentCurrency:ICurrency,
    rangeDate:Array<Date>,
    response?:IResponse
}

const InitialState:IInitialState = {
    baseCurrency:currencyList[1],
    currentCurrency:currencyList[0],
    rangeDate:[new Date(),new Date()],
    response:undefined
}

interface setComparisonBaseCurrency {
    type: ActionTypesComparison.SET_COMPARISON_BASE_CURRENCY,
    payload:ICurrency
}

interface setComparisonCurrentCurrency {
    type: ActionTypesComparison.SET_COMPARISON_CURRENT_CURRENCY,
    payload: ICurrency
}

interface steComparisonRangeDate {
    type: ActionTypesComparison.SET_COMPARISON_RANGE_DATE,
    payload: Array<Date>
}

interface fetchComparison {
    type: ActionTypesComparison.SET_COMPARISON_RESPONSE
    payload: IResponse
}

type Action = setComparisonBaseCurrency | setComparisonCurrentCurrency | steComparisonRangeDate | fetchComparison

const comparisonReducer = (state=InitialState,action:Action):IInitialState => {
    switch(action.type){
        case ActionTypesComparison.SET_COMPARISON_BASE_CURRENCY:
            return {...state, baseCurrency:action.payload}
        case ActionTypesComparison.SET_COMPARISON_CURRENT_CURRENCY:
            return {...state, currentCurrency:action.payload}
        case ActionTypesComparison.SET_COMPARISON_RANGE_DATE:
            return {...state, rangeDate:action.payload}
        case ActionTypesComparison.SET_COMPARISON_RESPONSE:
            return {...state, response:action.payload}
        default : return state
    }
}

export default comparisonReducer

