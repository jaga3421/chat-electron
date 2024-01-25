// userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  // define user state interface
}

const initialState: UserState = {
  // initial user state
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // define user-related reducers
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
