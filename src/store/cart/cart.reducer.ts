import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen } from "./cart.action";

import { CartItem } from "./cart.types";

// state should always be immutable (readonly)
export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
}

export const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const cartReducer = (
  state = CART_INITIAL_STATE, 
  action: AnyAction
): CartState => {
  if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload };
  }

  if (setIsCartOpen.match(action)) {
    return { ...state, isCartOpen: action.payload };
  }

  return state;
};