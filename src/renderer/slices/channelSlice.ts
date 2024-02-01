// channelSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Message = {
  id: string;
  channel_id: string;
  read_status: string;
  sender_id: string;
  created_at: string;
  sender: {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    avatar: string;
    high_res_avatar: string;
  };
  text: string;
};

type Channel = {
  id: string;
  last_message: Message;
  metadata: any;
  isSelected: boolean;
};

interface ChannelState {
  channels: Channel[];
}

const initialState: ChannelState = {
  channels: JSON.parse(localStorage.getItem('channels') || '[]'),
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    addChannel: (state, action: PayloadAction<Channel>) => {
      const index = state.channels.findIndex(
        (channel) => channel.id === action.payload.id,
      );

      if (index !== -1) {
        state.channels[index] = action.payload;
      } else {
        state.channels.push(action.payload);
      }
      // store channels in local storage
      localStorage.setItem('channels', JSON.stringify(state.channels));
    },
    selectChannel: (state, action: PayloadAction<string>) => {
      state.channels = state.channels.map((channel) => {
        if (channel.id === action.payload) {
          return { ...channel, isSelected: true };
        }
        return { ...channel, isSelected: false };
      });
    },
  },
});

export const { actions: channelActions, reducer: channelReducer } =
  channelSlice;
