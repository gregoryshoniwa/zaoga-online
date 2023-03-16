import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://zaoga-online.co.zw/api/";

// const API_URL = "https://zaoga-online.grebles.co.zw/api/";

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
const addUser = (data:postDataType) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};
const updateUser = (data:postDataType) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};

const userService = {
  getAllUsers,
  updateStatus,
  restPassword,
  addUser,
  updateUser
};

export default userService