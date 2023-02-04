import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "http://zaoga-online.co.zw/api/";

const API_URL = "https://zaoga-online.grebles.co.zw/api/";

type postDataType = {
    "name": string,
    "param": {}  
}

const getAllMembers = (data:postDataType) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};

const addMember = (data:postDataType) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};
const updateMember = (data:postDataType) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};

const updateMemberStatus = (data:postDataType) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

const memberService = {
  getAllMembers,
  addMember,
  updateMemberStatus,
  updateMember
};

export default memberService