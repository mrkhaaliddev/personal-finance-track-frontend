import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./users/authSlice";
import { usersSlice } from "./users/usersSlice";
import { categoryApi } from "./transaction/categoryApi";
import { transactionApi } from "./transaction/transactionApi";
import { budgetApi } from "./budget/budgetApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersSlice.reducerPath]: usersSlice.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [budgetApi.reducerPath]: budgetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersSlice.middleware)
      .concat(categoryApi.middleware)
      .concat(transactionApi.middleware)
      .concat(budgetApi.middleware),
  devTools: true,
});
export default store;
