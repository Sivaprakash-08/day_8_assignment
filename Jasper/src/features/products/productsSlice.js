import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('The product service could not respond. Please try again.');
    }
    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Could not load products. Check your internet connection.');
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Something went wrong.';
      });
  },
});

export default productsSlice.reducer;
