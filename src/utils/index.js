import axios from "axios";



export const AXIOS = axios.create({
    baseURL: process.env.API_URL
})


export const TIMEFRAME = [
    "1m",
    "2m",
    "5m",
    "15m",
    "30m",
    "60m",
    "90m",
    "1h",
    "1d",
    "5d",
    "1wk",
    "1mo",
    "3mo"
];