import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User } from "types/users/session";
import { initialLoginState } from "defaults/userDefaults";

const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    setLoginStatus(state, action: PayloadAction<boolean>) {
      state.loginStatus = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.loginStatus = Boolean(action.payload);
    },
    clearAuth(state) {
      state.currentUser = initialLoginState.currentUser;
      state.token = '';
      state.loginStatus = false;
    }
  }
});

export const { setCurrentUser, setLoginStatus, setToken, clearAuth } = loginSlice.actions;
export default loginSlice.reducer;
