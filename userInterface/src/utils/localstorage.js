// utils/localStorage.js
export const loadCartFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem('cart');
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) {
    return undefined;
  }
};

export const saveCartToLocalStorage = (cartState) => {
  try {
    const serialized = JSON.stringify(cartState);
    localStorage.setItem('cart', serialized);
  } catch (e) {
    // Ignore write errors
  }
};
