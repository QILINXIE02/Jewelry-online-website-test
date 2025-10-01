import { createSlice } from '@reduxjs/toolkit';
import superagent from 'superagent';

const productSlice = createSlice({
  name: 'products',
  initialState: { productList: [], activeProduct: {} },
  reducers: {
    setProductList(state, action) { state.productList = action.payload; },
    setActiveProduct(state, action) { state.activeProduct = action.payload; }
  }
});

export const getProducts = (category) => async dispatch => {
  try {
    let response = await superagent.get(`${process.env.REACT_APP_API}/products`);
    let products = response.body.filter(p => p.category === category);
    dispatch(setProductList(products));
  } catch (err) { console.error(err.message); }
};

export const getProduct = (id) => async dispatch => {
  try {
    let response = await superagent.get(`${process.env.REACT_APP_API}/products/${id}`);
    dispatch(setActiveProduct(response.body));
  } catch (err) { console.error(err.message); }
};

export const { setProductList, setActiveProduct } = productSlice.actions;
export default productSlice.reducer;
