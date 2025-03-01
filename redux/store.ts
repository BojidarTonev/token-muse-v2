import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import appStateReducer from './features/app-state-slice';

// Configure the store with our reducers
export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    // Add other reducers here as needed
  },
  // Add middleware or other store enhancers here if needed
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks for useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 