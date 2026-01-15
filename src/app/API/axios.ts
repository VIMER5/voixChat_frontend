import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
const baseURL = "http://localhost:3030/api/";

const $api = axios.create({
  withCredentials: true,
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default $api;
