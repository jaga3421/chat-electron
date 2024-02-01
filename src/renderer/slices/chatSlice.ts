// chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  text: string;
  timestamp: number;
  type: 'sent' | 'received';
}

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: Math.random().toString(),
        text: action.payload,
        timestamp: Date.now(),
        type: 'sent',
      });
    },
  },
});

export const { actions: chatActions, reducer: chatReducer } = chatSlice;
