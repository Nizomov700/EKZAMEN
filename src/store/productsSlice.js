// src/store/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../api/productsApi";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProducts();
      return data.map((product) => ({
        ...product,
        quantity: 0, // default
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: true,
    error: null,
  },
  reducers: {
    increment: (state, action) => {
      const product = state.items.find((p) => p.id === action.payload);
      if (product && product.quantity < product.available) {
        product.quantity += 1;
      }
    },
    decrement: (state, action) => {
      const product = state.items.find((p) => p.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const { increment, decrement } = productsSlice.actions;
export default productsSlice.reducer;
