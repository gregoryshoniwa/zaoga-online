import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";
import jwt_decode from "jwt-decode";


const user = ""

export const login:any = createAsyncThunk(
  "auth/login",
  async ({ username, password } : any, thunkAPI:any) => {
    try {
      const data = await AuthService.login(username, password);
      
      return { user: data };
    } catch (error :any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout:any = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: {} };

  
const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers:{
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            let { user } : any = jwt_decode(action.payload.user);
            
            state.user = {
                id: user.id,
                username: user.username,
                firstname: user.firstName,
                lastname: user.lastName,
                online:true,
                authorizations: JSON.parse(user.authorizations),
                token: `Bearer ${action.payload.user}` 
            }
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = {};
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = {};
        },
        
    },
    reducers: {
        offlineLogin (state,action){
            
            let { user } : any = jwt_decode(action.payload);
            
            state.isLoggedIn = true;
            state.user = {
                id: user.id,
                username: user.username,
                firstname: user.firstName,
                lastname: user.lastName,
                online:false,
                authorizations: JSON.parse(user.authorizations),
                token: `Bearer ${action.payload}` 
            }
        }
    }
});

const { reducer } = authSlice;
export const { offlineLogin } = authSlice.actions
export default reducer;