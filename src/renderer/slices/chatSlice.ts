// chatSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ChatState {
  // define chat state interface
}

const initialState: ChatState = {
  // initial chat state
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // define chat-related reducers
  },
});

export const { actions: chatActions, reducer: chatReducer } = chatSlice;
