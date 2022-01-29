/* eslint-disable */ 

import { currencyList } from "../../constans/currencyList";
import { ICurrency } from "../../models/interfaceIcurrency";
import { ActionTypesChart } from "../actions/actionTypes";

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

interface setChartBaseCurrency {
    type: ActionTypesChart.SET_CHART_BASE_CURRENCY,
    payload:ICurrency
}

interface setChartCurrentCurrency {
    type: ActionTypesChart.SET_CHART_CURRENT_CURRENCY,
    payload: ICurrency
}

interface steChartRangeDate {
    type: ActionTypesChart.SET_CHART_RANGE_DATE,
    payload: Array<Date>
}

interface fetchChart {
    type: ActionTypesChart.SET_CHART_RESPONSE
    payload: IResponse
}

type Action = setChartBaseCurrency | setChartCurrentCurrency | steChartRangeDate | fetchChart

const chartReducer = (state=InitialState,action:Action):IInitialState => {
    switch(action.type){
        case ActionTypesChart.SET_CHART_BASE_CURRENCY:
            return {...state, baseCurrency:action.payload}
        case ActionTypesChart.SET_CHART_CURRENT_CURRENCY:
            return {...state, currentCurrency:action.payload}
        case ActionTypesChart.SET_CHART_RANGE_DATE:
            return {...state, rangeDate:action.payload}
        case ActionTypesChart.SET_CHART_RESPONSE:
            return {...state, response:action.payload}
        default : return state
    }
}

export default chartReducer

