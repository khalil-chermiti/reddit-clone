import { createSlice } from "@reduxjs/toolkit";

// * selectors
export const selectCurrentUser = state => state.userReducer.user;
export const selectAuth = state => state.userReducer.auth;

const initialState = {
  user: null,
  auth: { jwt: null, roles: [] },
  error: null,
  isFetching: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSignIn: (state, action) => {
      state.isFetching = true;
    },
    userSignInSuccess: (state, action) => {
      state.auth.jwt = action.payload;
      state.error = false;
      state.isFetching = false;
    },
    userSignInError: (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
    },
    setNewToken: (state, action) => {
      state.auth.jwt = action.payload;
    },

    getUserDataSuccess: (state, action) => {
      state.error = null;
      state.isFetching = false;
      state.user = action.payload;
    },
    getUserDataError: (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
    },
  },
});

export const {
  userSignInError,
  userSignInSuccess,
  userSignIn,
  setNewToken,
  getUserDataSuccess,
  getUserDataError,
} = userSlice.actions;

export default userSlice.reducer;
