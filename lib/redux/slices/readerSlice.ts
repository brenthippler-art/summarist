import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FontSize = "base" | "lg" | "xl" | "two2xl";

interface ReaderState {
  fontSize: FontSize;
}

const initialState: ReaderState = {
  fontSize: "base",
};

const readerSlice = createSlice({
  name: "reader",
  initialState,
  reducers: {
    setFontSize: (state, action: PayloadAction<FontSize>) => {
      state.fontSize = action.payload;
    },
  },
});

export const { setFontSize } = readerSlice.actions;
export default readerSlice.reducer;