// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from '../slices/userSlice';
import { chatReducer } from '../slices/chatSlice';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
});

export default rootReducer;
