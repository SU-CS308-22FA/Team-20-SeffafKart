import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: [],
    admin: false,
    isLogin: false
    //isFetching: false,
    // error: false,
    // admin: false
  },
  reducers: {
    deleteUser: (state ,action) => {
      state.currentUser = [];
      state.isLogin = false;
    },
    updateUserName: (state,action) => {
      state.currentUser[0].username = action.payload;
    },
    updateUserEmail: (state,action) => {
      state.currentUser[0].email = action.payload;
    },
    updateUserPassword: (state,action) => {
      state.currentUser[0].password = action.payload;
    },
    updateUserinfo: (state,action) => {
      state.currentUser[0].userinfo = action.payload;
    },
    loginSuccessAdmin: (state, action) => {
      //state.isFetching = false;
      state.currentUser = action.payload;
      state.isLogin = true;
      state.admin = true;
    },
    loginSuccessUser: (state, action) => {
      //state.isFetching = false;
      state.currentUser = action.payload.user;
      state.isLogin = true;
      if(action.payload.user[0].isAdmin === 1) {
        state.admin = true;
      }
    },
    loginFailure: (state) => {
      //state.isFetching = false;
      //state.error = true;
    },
    logoutUser: (state) => {
      state.currentUser = [];
      state.isLogin = false;
      state.admin = false;
      // state.error = false;
      // state.admin = false;
    }
  },
});

export const { deleteUser, updateUserName, updateUserEmail, loginSuccessAdmin, updateUserPassword, updateUserinfo, loginSuccessUser, loginFailure, logoutUser} = userSlice.actions;
export default userSlice.reducer;