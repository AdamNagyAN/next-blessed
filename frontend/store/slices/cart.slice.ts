import { createSlice } from '@reduxjs/toolkit';

export interface CardItem {
  id: number;
  size: string;
  quantity: number;
}

export const CARD_ITEMS_QUANTITY_LIMIT = 10;

export interface CartSlice {
  cart: CardItem[];
}

const initialState: CartSlice = {
  cart: []
};

const getNewQuantity = (newValue: number): number => {
  if (newValue < 1) return 1;
  if (newValue > CARD_ITEMS_QUANTITY_LIMIT)
    return CARD_ITEMS_QUANTITY_LIMIT;
  return newValue;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const isAlreadyInCart = state.cart.some(
        (it) =>
          it.id === action.payload.id &&
          it.size === action.payload.size
      );
      if (isAlreadyInCart) {
        state.cart = state.cart.map((it) => {
          if (
            it.id === action.payload.id &&
            it.size === action.payload.size
          ) {
            return {
              ...it,
              quantity: getNewQuantity(it.quantity + 1)
            };
          }
          return it;
        });
        return;
      }

      state.cart.push({
        ...action.payload,
        quantity: Math.min(
          action.payload.quantity,
          CARD_ITEMS_QUANTITY_LIMIT
        )
      });
    },
    removeItem(state, action) {
      state.cart = state.cart.filter(
        (it) =>
          it.id !== action.payload.id && it.size !== action.payload.id
      );
    },
    updateQuantity(
      state,
      action: {
        payload: { id: number; size: string; quantity: number };
      }
    ) {
      state.cart = state.cart.map((it) => {
        if (
          it.id === action.payload.id &&
          it.size === action.payload.size
        ) {
          return {
            ...it,
            quantity: getNewQuantity(action.payload.quantity)
          };
        }
        return it;
      });
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
