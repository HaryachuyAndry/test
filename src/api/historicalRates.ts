import moment from "moment";
import axios from "./axios";

interface IHistoricalRates {
    date:Date,
    currency:string
} 

export const historicalRates = ({ date,currency }:IHistoricalRates) => {
  return axios({
    method: "get",
    url: `/${moment(date).format('YYYY-MM-DD')}?base=${currency}`,
  });
};
