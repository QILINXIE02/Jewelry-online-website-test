import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], customer: {}, paymentInfo: {} },
  reducers: {
    add(state, action) {
      const existing = state.items.find(p => p.id === action.payload.id);
      if (!existing) state.items.push(action.payload);
    },
    remove(state, action) {
      state.items = state.items.filter(p => p.id !== action.payload.id);
    },
    updateCustomer(state, action) {
      state.customer = action.payload;
    },
    updatePaymentInfo(state, action) {
      state.paymentInfo = action.payload;
    }
  }
});

export const { add, remove, updateCustomer, updatePaymentInfo } = cartSlice.actions;

export const addToCart = (product) => dispatch => {
  const updatedProduct = { ...product, inStock: product.inStock - 1 };
  dispatch(add(updatedProduct));
};

export const removeFromCart = (product) => dispatch => {
  dispatch(remove(product));
};

export default cartSlice.reducer;
