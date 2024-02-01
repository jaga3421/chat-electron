// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';

import { chatReducer } from '../slices/chatSlice';
import { channelReducer } from '../slices/channelSlice';
import authReducer from '../slices/authSlice';

const rootReducer = combineReducers({
  chat: chatReducer,
  auth: authReducer,
  channels: channelReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
