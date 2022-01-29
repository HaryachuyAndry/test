import { Dispatch } from "redux";
import { timeSeries } from "../../api/timeseries";
import { ICurrency } from "../../models/interfaceIcurrency";
import store from "../store";
import { ActionTypesChart } from "./actionTypes";

export const setChartBaseCurrency = (payload:ICurrency) => (
    { type:ActionTypesChart.SET_CHART_BASE_CURRENCY,
      payload 
    })

export const setChartCurrentCurrency = (payload:ICurrency) => ({
    type: ActionTypesChart.SET_CHART_CURRENT_CURRENCY,
    payload
})

export const setChartRangeDate = (payload:Array<Date>) => ({
    type: ActionTypesChart.SET_CHART_RANGE_DATE,
    payload
})

export const fetchChart = () => {
    return async (dispatch: Dispatch) => {
        const { 
            baseCurrency, 
            currentCurrency, 
            rangeDate } = store.getState().chartReducer
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
            type:ActionTypesChart.SET_CHART_RESPONSE,
            payload:{ arrRes,currency:currentCurrency.code }
        })
    }
}