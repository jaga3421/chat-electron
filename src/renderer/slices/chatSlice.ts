// chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  text: string;
  timestamp: number;
  type: 'sent' | 'received';
  unread?: boolean;
}

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: localStorage.getItem('localMessages')
    ? JSON.parse(localStorage.getItem('localMessages')!)
    : [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<Message>) => {
      /* Check if message ID exists in state
          If yes, it is a sent message, and we update status & Read receipt
      */
      const { id, text } = action.payload;
      const existingMessageIndex = state.messages.findIndex(
        (message) => message.id === id,
      );
      if (existingMessageIndex !== -1) {
        state.messages[existingMessageIndex] = {
          ...state.messages[existingMessageIndex],
          text,
          timestamp: Date.now(),
          type: 'sent',
        };
      } else {
        state.messages.push({
          id,
          text,
          timestamp: Date.now(),
          type: 'sent',
        });
      }
      localStorage.setItem('localMessages', JSON.stringify(state.messages));
    },

    getMessage: (state, action: PayloadAction<Message>) => {
      const { id, text } = action.payload;
      state.messages.push({
        id,
        text,
        timestamp: Date.now(),
        type: 'received',
        unread: !document.hasFocus(),
      });

      window.electron?.ipcRenderer.sendMessage(
        'show-notification',
        text,
        document.hasFocus() ? 0 : 1,
      );
      localStorage.setItem('localMessages', JSON.stringify(state.messages));
    },
  },
});
export const { getMessage } = chatSlice.actions;
export const { actions: chatActions, reducer: chatReducer } = chatSlice;
