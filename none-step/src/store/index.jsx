import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage : sessionStorage,
 // whitelist : 세션 스토리지에 유지할 상태를 지정할 수 있음
  whitelist: ['member'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
