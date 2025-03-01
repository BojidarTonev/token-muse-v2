import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the interface for the authentication state
interface AppState {
  isAuthenticated: boolean;
  publicKey: string | null;
  isLoading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AppState = {
  isAuthenticated: false,
  publicKey: null,
  isLoading: false,
  error: null,
};

// Create the slice
export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Set authenticated state when user connects wallet
    setAuthenticated: (state, action: PayloadAction<{ publicKey: string }>) => {
      state.isAuthenticated = true;
      state.publicKey = action.payload.publicKey;
      state.error = null;
    },
    
    // Clear authentication state when user disconnects wallet
    clearAuthentication: (state) => {
      state.isAuthenticated = false;
      state.publicKey = null;
    },
  },
});

// Export actions
export const { 
  setLoading, 
  setError, 
  setAuthenticated, 
  clearAuthentication 
} = appStateSlice.actions;

// Export reducer
export default appStateSlice.reducer; 