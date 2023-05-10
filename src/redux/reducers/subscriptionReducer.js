import { createReducer } from '@reduxjs/toolkit';

export const subscriptionReducer = createReducer(
  {},
  {
     // ---------------------------------------------Buy Subscription------------------------------
    buySubscriptionRequest: state => {
      state.loading = true;
    },

    buySubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.subscriptionId = action.payload;
    },

    buySubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ---------------------------------------------Cancel Subscription------------------------------
    cancelSubscriptionRequest: state => {
      state.loading = true;
    },

    cancelSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    cancelSubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ---------------------------------------------Toaster------------------------------
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
