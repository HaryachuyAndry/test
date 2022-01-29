 import { Dispatch } from "redux";
import { timeSeries } from "../../api/timeseries";
import { ICurrency } from "../../models/interfaceIcurrency";
import store from "../store";
import { ActionTypesComparison } from "./actionTypes";

export const setComparisonBaseCurrency = (payload:ICurrency) => (
    { type:ActionTypesComparison.SET_COMPARISON_BASE_CURRENCY,
      payload 
    })

export const setComparisonCurrentCurrency = (payload:ICurrency) => ({
    type: ActionTypesComparison.SET_COMPARISON_CURRENT_CURRENCY,
    payload
})

export const setComparisonRangeDate = (payload:Array<Date>) => ({
    type: ActionTypesComparison.SET_COMPARISON_RANGE_DATE,
    payload
})

export const fetchComparison = () => {
    return async (dispatch: Dispatch) => {
        const { baseCurrency, 
            currentCurrency, 
            rangeDate } = store.getState().comparisonReducer
        const { data } = await timeSeries({
            startDate:rangeDate[0],
            endDate:rangeDate[1],
            base:baseCurrency.code,
            currency:currentCurrency.code
        })
        const arrRes: Array<[string, number | unknown]> = Object.keys(
            data.rates
          ).map((key) => [key, Object.values(data.rates[key])[0]]);
        dispatch({
            type:ActionTypesComparison.SET_COMPARISON_RESPONSE,
            payload:{ arrRes,currency:currentCurrency.code }
        })
    }
}