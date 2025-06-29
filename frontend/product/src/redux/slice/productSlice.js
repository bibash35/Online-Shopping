
import { createSlice } from "@reduxjs/toolkit";
import {  toast } from 'react-hot-toast';

const initialState = {
  productList: [],
  cartItem: [],
  searchTerm: '',
  filteredProducts: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
      state.filteredProducts = [...action.payload]; // initially, all products are shown
    },
    
    addCartItem: (state, action) => {
      // Check if the product already exists in the cart
      const existingItem = state.cartItem.find((el) => el._id === action.payload._id);
    
      if (existingItem) {
        // If it exists, increase the quantity and update the total price
        existingItem.qty += 1;
        existingItem.total = existingItem.qty * existingItem.price;
      } else {
        // If it doesn't exist, add it as a new product with quantity 1
        toast.success("Item added to Cart");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total }
        ];
      }
    },

    deleteCartItem: (state, action) => {
      toast("one Item Delete");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
      console.log(index);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;

      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;
        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
      }
    },
    
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});
export const selectCartItemCount = (state) => {
  // Return the total number of items in the cart (taking qty into account)
  return state.product.cartItem.reduce((acc, item) => acc + item.qty, 0);
};
export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  setSearchTerm,
} = productSlice.actions;

export default productSlice.reducer;
