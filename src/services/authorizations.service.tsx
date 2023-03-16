import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://zaoga-online.co.zw/api/";

// const API_URL = "https://zaoga-online.grebles.co.zw/api/";

type postDataType = {
    "name": string,
    "param": {}  
}

const getAllUserTypes = (data:postDataType) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};

const addAuthorization = (data:postDataType) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};
const updateAuthorization = (data:postDataType) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};



const authorizationsService = {
    getAllUserTypes,
    addAuthorization,
    updateAuthorization
};

export default authorizationsService