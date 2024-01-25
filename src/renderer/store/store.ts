// store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  // add middleware or enhancers if needed
});

export default store;
