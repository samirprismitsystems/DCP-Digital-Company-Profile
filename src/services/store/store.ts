import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./slices/dashboardSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
