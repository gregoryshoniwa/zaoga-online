import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://zaoga-online.co.zw/api/";

// const API_URL = "https://zaoga-online.grebles.co.zw/api/";

type postDataType = {
    "name": string,
    "param": {}  
}

const getAllTractions = (data:postDataType) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};
const addTransaction = (data:postDataType) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};
const updateTransaction = (data:postDataType) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};




const transactionService = {
  getAllTractions,
  addTransaction,
  updateTransaction
};

export default transactionService