import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { signIn } from '../api/auth';

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  authResponse: any;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
  authResponse: null,
};

export const signInAsync = createAsyncThunk(
  'auth/signIn',
  async (payload: {
    phoneNumber: string;
    countryCode: string;
    verifyCode: string;
    appCheckToken: string;
    deviceId: string;
  }) => {
    const response = await signIn(
      payload.phoneNumber,
      payload.countryCode,
      payload.verifyCode,
      payload.appCheckToken,
      payload.deviceId,
    );

    if (response.error === null) {
      return response;
    }
    throw new Error(response.error?.message ?? 'Unknown error');
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.authResponse = action.payload.data;
        state.token = action.payload.data.token;

        if (action.payload.data.token) {
          localStorage.setItem('authToken', action.payload.data.token);
        }
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
