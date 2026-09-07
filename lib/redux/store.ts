import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice";
import readerReducer from "./slices/readerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      modal: modalReducer,
      reader: readerReducer,
      // add more slices here as you build them, e.g. player, library, ui
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

