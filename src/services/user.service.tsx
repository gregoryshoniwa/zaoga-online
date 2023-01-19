import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://zaoga-online.co.zw/api/";

type postDataType = {
    "name": string,
    "param": {}  
}

const getAllUsers = (data:postDataType) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};

const updateStatus = (data:postDataType) => {
    return axios.post(API_URL, data, { headers: authHeader() });
};

const restPassword = (data:postDataType) => {
    return axios.post(API_URL, data, { headers: authHeader() });
};

const userService = {
  getAllUsers,
  updateStatus,
  restPassword
};

export default userService