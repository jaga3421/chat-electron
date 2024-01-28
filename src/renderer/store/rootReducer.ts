// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from '../slices/userSlice';
import { chatReducer } from '../slices/chatSlice';
import authReducer from '../slices/authSlice';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
