export interface ICurrency {
    symbol:string
    label:string
    code:string
}

export interface IField {
    value: number;
    symbol: string;
    label: string;
    code: string;
  }
  
 export  interface IResult {
    from: IField;
    to: IField;
    rate: number;
  }