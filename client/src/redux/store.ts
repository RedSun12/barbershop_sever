import { configureStore, Store } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import productSlice from './productSlice';

const storeOptions = {
  reducer: {
    userSlice,
    productSlice
  },
};

export const store: Store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
