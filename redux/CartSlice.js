import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find((item) => item.id === action.payload.id);
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action) => {
      const itemToIncrement = state.cart.find((item) => item.id === action.payload.id);
      if (itemToIncrement) {
        itemToIncrement.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const itemToDecrement = state.cart.find((item) => item.id === action.payload.id);
      if (itemToDecrement) {
        if (itemToDecrement.quantity > 1) {
          itemToDecrement.quantity--;
        } else {
          state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        }
      }
    },
    cleanCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, cleanCart } = CartSlice.actions;

export default CartSlice.reducer;
