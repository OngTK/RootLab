import { configureStore } from '@reduxjs/toolkit';
import place from './placeSlice';

export const store = configureStore({
  reducer: { place },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;