import { CartType, InitialStateType } from "../types";

type Action = {
  type: "CLEAR_CART" | "ADD_TO_CART" | "SHOW_ADD_TO_CART";
  payload?: any;
};

const cartReducer = (state: InitialStateType, action: Action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  if (action.type === "ADD_TO_CART") {
    const {
      totalAdult,
      totalChildren,
      totalOldAgePensioner,
      play,
      totalPrice,
    } = action.payload as CartType;

    const newItem: CartType = {
      totalAdult,
      totalChildren,
      totalOldAgePensioner,
      play,
      totalPrice,
    };

    return { ...state, cart: [...state.cart, newItem] };
  }

  if (action.type === "SHOW_ADD_TO_CART") {
    return { ...state, showCart: true };
  }
  throw new Error(`No matching ${action.type} action type`);
};

export default cartReducer;
