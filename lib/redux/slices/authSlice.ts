import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  uid: string | null;
  email: string | null;
  isSubscribed: boolean;
  planKey: "monthly" | "yearly" | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  uid: null,
  email: null,
  isSubscribed: false,
  planKey: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ uid: string; email: string }>) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.isLoading = false;
    },
    setSubscriptionStatus: (
      state,
      action: PayloadAction<{ isSubscribed: boolean; planKey: "monthly" | "yearly" | null }>
    ) => {
      state.isSubscribed = action.payload.isSubscribed;
      state.planKey = action.payload.planKey;
    },
    clearUser: (state) => {
      state.uid = null;
      state.email = null;
      state.isSubscribed = false;
      state.planKey = null;
      state.isLoading = false;
    },
  },
});

export const { setUser, setSubscriptionStatus, clearUser } = authSlice.actions;
export default authSlice.reducer;