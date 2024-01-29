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
  messages: [
    {
      id: '1',
      text: 'Hello!',
      timestamp: 1633029600000,
      type: 'received',
    },
    {
      id: '2',
      text: 'Hi, how are you?',
      timestamp: 1633029660000,
      type: 'sent',
    },
    {
      id: '3',
      text: 'I am fine, thank you.',
      timestamp: 1633029720000,
      type: 'received',
    },
    {
      id: '4',
      text: 'Great to hear that!',
      timestamp: 1633029780000,
      type: 'sent',
    },
  ],
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
