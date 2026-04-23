import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialLoginState } from "defaults/userDefaults";
import { User } from "types/users/session";

const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    clearAuth(state) {
      state.currentUser = initialLoginState.currentUser;
      state.token = '';
    }
  }
});

export const { setCurrentUser, setToken, clearAuth } = loginSlice.actions;
export default loginSlice.reducer;
