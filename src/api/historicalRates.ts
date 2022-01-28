import axios from "./axios";

interface IHistoricalRates {
    date:Date,
    currency:string
} 

export const historicalRates = ({ date,currency }:IHistoricalRates) => {
  return axios({
    method: "get",
    url: `/${date}?${currency}`,
  });
};
