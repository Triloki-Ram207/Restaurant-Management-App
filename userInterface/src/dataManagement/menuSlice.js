import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

// ✅ Fetch paginated items for a specific category
export const fetchCategoryItems = createAsyncThunk(
  'menu/fetchCategoryItems',
  async ({ category, offset = 0, limit = 6 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendURL}/api/v1/menu/${category}?limit=${limit}&offset=${offset}`
      );
      return {
        category,
        items: response.data.items,
        total: response.data.total,
        offset,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Fetch failed');
    }
  }
);

// ✅ Fetch all menu categories
export const fetchMenuCategories = createAsyncThunk(
  'menu/fetchMenuCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendURL}/api/v1/menuData`
      );
      console.log(response);
      return response.data; // assuming response is { categories: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch categories');
    }
  }
);

// ✅ Slice definition
const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: {},        // { pizza: [...], burger: [...] }
    offsets: {},      // { pizza: 6, burger: 12 }
    totals: {},       // { pizza: 18, burger: 10 }
    categories: [],   // ['pizza', 'burger', ...]
    status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
    loadingMore: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔄 Category items
      .addCase(fetchCategoryItems.pending, (state) => {
        state.loadingMore = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategoryItems.fulfilled, (state, action) => {
        const { category, items, total, offset } = action.payload;

        if (!state.items[category]) state.items[category] = [];
        state.items[category] = [...state.items[category], ...items];
        state.offsets[category] = offset + items.length;
        state.totals[category] = total;

        state.loadingMore = false;
        state.status = 'succeeded';
      })
      .addCase(fetchCategoryItems.rejected, (state, action) => {
        state.loadingMore = false;
        state.status = 'failed';
        state.error = action.payload;
      })

      // 📦 Menu categories
      .addCase(fetchMenuCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMenuCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMenuCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;
