import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
