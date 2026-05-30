import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from "./services/apiSlice";
import { authSlice } from "./slice/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiSlice.middleware])
});

setupListeners(store.dispatch)