import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  isAuthenticated: false,
  email: " ",
  token: " ",
  name: " ",
};

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: InitialState,
  reducers: {
    UpdateUserInfoLogin(state, action) {
      const UserInfo = action.payload;
      state.isAuthenticated = true;
      state.email = UserInfo.email;
      state.token = UserInfo.token;
      state.name = UserInfo.name;
    },
    UpdateUserInfoLogout(state){
        state.isAuthenticated=false;
        state.email=" ";
        state.token=" ";
        state.name=" ";
    }
  },
});

export default AuthSlice.reducer;

export const AuthActions = AuthSlice.actions;
