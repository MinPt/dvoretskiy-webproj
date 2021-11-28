import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "../services/enteties/product";

const initialState = [
  { name: "tea", description: "Some random discription", price: 200 },
];

export const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async (productId) => {
    const product = ProductApi.deleteProduct(productId);
    return product;
  }
);

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const products = await ProductApi.getProducts();
  return products;
});

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const updatedProduct = await ProductApi.updateProduct(product);
    return updatedProduct;
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const createdProduct = await ProductApi.createProduct(product);
    return createdProduct;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      const products = [...action.payload];

      return products;
    },
    [removeProduct.fulfilled]: (state, action) => {
      const products = state.filter(
        (product) => product._id !== action.payload._id
      );
      return products;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [updateProduct.fulfilled]: (products, action) => {
      products.map((product) => {
        if (product._id === action.payload._id) return action.payload;
        return product;
      });
    },
  },
});
