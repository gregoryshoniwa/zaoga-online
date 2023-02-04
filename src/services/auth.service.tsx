import axios from "axios";

// const API_URL = "http://zaoga-online.co.zw/api/";

const API_URL = "https://zaoga-online.grebles.co.zw/api/";


const login = (username:string, password:string) => {
  return axios
    .post(API_URL, {
        name: "generateToken",
        param: {
          username,
          password
        }
    })
    .then((response) => {
      if (response.data.response.result.token) {
        
        localStorage.setItem("user", response.data.response.result.token);
        localStorage.setItem("token", response.data.response.result.token);
      }
    
      return response.data.response.result.token;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
//   register,
  login,
  logout,
};

export default authService;