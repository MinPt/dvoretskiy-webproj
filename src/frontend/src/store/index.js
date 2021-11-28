import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { productSlice } from "./productSlice";
import { currentUserSlice } from "./currentUserSlice";
import { productCartSlice } from "./productCartSlice";

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    products: productSlice.reducer,
    currentUser: currentUserSlice.reducer,
    productCart: productCartSlice.reducer,
  },
});
