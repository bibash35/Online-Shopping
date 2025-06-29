
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    loginRedux: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user data in localStorage
    },
    logout: (state) => {
      state.value = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // Optionally remove token as well
    },
  },
});

export const { loginRedux, logout } = userSlice.actions;

export default userSlice.reducer;
