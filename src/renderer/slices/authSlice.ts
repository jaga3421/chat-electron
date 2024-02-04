import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { signIn } from '../api/auth';

interface AuthState {
  token: string | null;
  tokenExpiresAt: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  user: object;
  error: string | null;
  authResponse: any;
}

const initialState: AuthState = {
  status: 'idle',
  error: null,
  user: {},
  authResponse: null,
  token: localStorage.getItem('authToken') || null,
  tokenExpiresAt: Number(localStorage.getItem('tokenExpiresAt')) || null,
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
    clearToken: (state) => {
      state.token = null;
      state.tokenExpiresAt = null;
      state.user = {};
      state.authResponse = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';

        // setting token information
        state.token = action.payload.data.token;
        state.authResponse = action.payload.data;
        state.user = action.payload.data.account;
        state.tokenExpiresAt = Number(action.payload.data.token_expires_at);
        if (action.payload.data.token) {
          localStorage.setItem('authToken', action.payload.data.token);
          localStorage.setItem(
            'tokenExpiresAt',
            action.payload.data.token_expires_at,
          );
        }
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export const isTokenValid = (state: { auth: AuthState }) => {
  if (state.auth.token && state.auth.tokenExpiresAt) {
    const now = new Date();
    const tokenExpiresAt = new Date(state.auth.tokenExpiresAt * 1000);
    return now <= tokenExpiresAt;
  }
  return false;
};

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
