import axios from "./axios";

interface IConvert {
    from:string,
    to:string,
    amount:number
} 

export const convert = ({ from, to , amount }:IConvert) => {
  return axios({
    method: "get",
    url: `/convert?from=${from}&to=${to}&amount=${amount}`,
  });
};
