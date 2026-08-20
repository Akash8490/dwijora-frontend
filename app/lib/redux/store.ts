import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "@/app/lib/redux/slices/uiSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      ui: uiReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
