import moment from "moment";
import axios from "./axios";

interface IHistoricalRates {
    startDate:Date,
    endDate:Date,
    base:string,
    currency:string
} 

export const timeSeries = ({ 
    startDate,
    endDate,
    base,
    currency 
}:IHistoricalRates) => {
  return axios({
    method: "get",
    url: `/timeseries?start_date=${moment(startDate).format('YYYY-MM-DD')}}&end_date=${moment(endDate).format('YYYY-MM-DD')}&base=${base}&symbols=${currency}`,
  });
};
