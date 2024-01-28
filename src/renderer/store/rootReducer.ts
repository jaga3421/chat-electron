// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';

import { chatReducer } from '../slices/chatSlice';
import authReducer from '../slices/authSlice';

const rootReducer = combineReducers({
  chat: chatReducer,
  auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
