import { createSlice } from '@reduxjs/toolkit';

export interface CardItem {
  id: number;
  size: string;
  quantity: number;
}

const CARD_ITEMS_QUANTITY_LIMIT = 10;

export interface CartSlice {
  cart: CardItem[];
}

const initialState: CartSlice = {
  cart: []
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
              quantity: Math.min(
                it.quantity + action.payload.quantity,
                CARD_ITEMS_QUANTITY_LIMIT
              )
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
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
