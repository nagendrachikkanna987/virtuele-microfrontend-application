import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import companyAuthReducer from './companyAuth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    companyAuth: companyAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
