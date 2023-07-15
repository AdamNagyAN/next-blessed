import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cart.slice';

const LOCAL_STORAGE_KEY = 'redux-state';

const persistedState = localStorage.getItem(LOCAL_STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string)
  : {};

const store = configureStore({
  reducer: {
    cart: cartReducer
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ cart: store.getState().cart })
  );
});
export default store;
