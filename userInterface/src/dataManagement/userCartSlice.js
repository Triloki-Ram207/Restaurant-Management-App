// userCartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {},  
    user: null,  // new key to store user form data
  },
  reducers: {
    storeItem: (state, action) => {
      const item = action.payload;
      if (!state.items) state.items = {};
      if (!state.items[item.name]) {
        state.items[item.name] = {
          ...item,
          qty: 1,
        };
      }
      toast.success('Item added to cart');
    },
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items[item.name];
      state.items[item.name] = {
        ...item,
        qty: existing ? existing.qty + 1 : 1,
      };
      toast.success('Item added to cart');
    },

    removeItem: (state, action) => {
  const itemName = action.payload;
  const existingItem = state.items[itemName];

  if (!existingItem) return;

  if (existingItem.qty > 1) {
    existingItem.qty -= 1;
  } else {
    delete state.items[itemName];
  }
  toast.error('Item removed from cart');
},

    setUser: (state, action) => {
      state.user = action.payload;
    },
     deleteItem: (state, action) => {
    const itemName = action.payload;
    if (state.items[itemName]) {
      delete state.items[itemName];
    }
    toast.error('Item removed from cart');
  },
  updateOrderType: (state, action) => {
  const type = action.payload;
  Object.keys(state.items).forEach((itemName) => {
    state.items[itemName].orderType = type;
  });
  console.log(state.items);
},
clearCart: (state) => {
  state.items = {};
  state.user = null;
},

  },
});

export const { addItem, removeItem, setUser, storeItem,deleteItem,updateOrderType,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
