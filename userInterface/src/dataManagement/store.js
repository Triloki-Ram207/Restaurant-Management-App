// store.js
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import cartReducer from './userCartSlice';

const loadCartFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem('cart');
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

const saveCartToLocalStorage = (cartState) => {
  try {
    const serialized = JSON.stringify(cartState);
    localStorage.setItem('cart', serialized);
  } catch {}
};

const preloadedCart = loadCartFromLocalStorage();

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: preloadedCart || { items: {}, user: null },
  },
});

store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart);
});
