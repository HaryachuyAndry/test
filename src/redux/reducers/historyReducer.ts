/* eslint-disable */

import { currencyList } from "../../constans/currencyList";
import { ICurrency } from "../../models/interfaceIcurrency";
import { ActionTypesHistory } from "../actions/actionTypes";

interface IResponse {
    base: string;
    rates: Array<[string, number]>;
}

interface IInitialState {
    currency:ICurrency,
    date:Date,
    result?:IResponse
}

const initialState: IInitialState = {
    currency:currencyList[1],
    date:new Date(),
    result:undefined
}

interface SetCurrency {
    type: ActionTypesHistory.SET_HISTORY_CURRENCY,
    payload:ICurrency
}

interface SetDate {
    type: ActionTypesHistory.SET_HISTORY_DATE,
    payload:Date
}

interface FetchHistoryData {
    type: ActionTypesHistory.FETCH_HISTORY_DATA,
    payload:IResponse
}

type Action = SetCurrency | SetDate | FetchHistoryData

const historyReducer = (state = initialState, action:Action):IInitialState => {
    switch(action.type){
        case ActionTypesHistory.SET_HISTORY_CURRENCY:
            return {...state, currency:action.payload}
        case ActionTypesHistory.SET_HISTORY_DATE:
            return {...state, date:action.payload}
        case ActionTypesHistory.FETCH_HISTORY_DATA:
            return {...state, result:action.payload}
        default: return state
    }
}

export default historyReducer