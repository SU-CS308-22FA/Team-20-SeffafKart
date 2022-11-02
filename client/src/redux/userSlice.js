import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: [],
    //isFetching: false,
    // error: false,
    // admin: false
  },
  reducers: {
    deleteUser: (state ,action) => {
      state.currentUser = [];
    },
    updateUser: (state,action) => {
      state.currentUser = action.payload;
    },
    loginSuccessAdmin: (state, action) => {
      //state.isFetching = false;
      state.currentUser = action.payload;
      //state.admin = true;
    },
    loginSuccessUser: (state, action) => {
      //state.isFetching = false;
      state.currentUser = action.payload.user;
    },
    loginFailure: (state) => {
      //state.isFetching = false;
      //state.error = true;
    },
    logoutUser: (state,action) => {
      state.currentUser = [];
      // state.error = false;
      // state.admin = false;
    }
  },
});

export const { deleteUser, updateUser, loginSuccessAdmin, loginSuccessUser, loginFailure, logoutUser} = userSlice.actions;
export default userSlice.reducer;