import { configureStore } from '@reduxjs/toolkit';

import providerReducer from './features/providerSlice';
import { likedReducer } from './features/likedReducer';

export const store = configureStore({
  reducer: {
    provider: providerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
