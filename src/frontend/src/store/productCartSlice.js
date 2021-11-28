import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const productCartSlice = createSlice({
  name: "productCart",
  initialState,
  reducers: {
    add: (cart, action) => {
      const itemHere = cart.filter((item) => item._id === action.payload._id);
      if (itemHere.length > 0) {
        cart.forEach((item) => {
          if (item._id === itemHere[0]._id) {
            item.count++;
          }
        });
        return cart;
      }
      const newProduct = { ...action.payload, count: 1 };
      cart.push(newProduct);
      return cart;
    },

    remove: (cart, action) => {
      const isFound = cart.find((item) => item._id === action.payload);

      if (!isFound) return cart;
      if (isFound.count < 2) cart.splice(cart.indexOf(isFound), 1);

      cart.forEach((item) => {
        if (item._id === action.payload) item.count--;
      });
    },
    removeAll: (cart, action) => {
      const isFound = cart.find((item) => item._id === action.payload);
      cart.splice(cart.indexOf(isFound), 1);
    },
    clearCart: (cart, actions) => {
      return [];
    },
  },
});
