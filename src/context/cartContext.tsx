import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { CartType, InitialStateType } from "../types";
import reducer from "../reducers/cartReducers";
import { getLocalStorageCart } from "../constants";

type CartProviderProp = {
  children: ReactNode;
};

const initialState: InitialStateType = {
  cart: getLocalStorageCart(),
  totalAmount: 0,
  addToCart: () => {},
  clearCart: () => {},
  showAddToCart: false,
  setShowAddToCart: () => {},
  //   showCart: () => {}, // ✅ Now it's a function
};

const CartContext = createContext<InitialStateType>(initialState);

export const CartProvider = ({ children }: CartProviderProp) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showAddToCart, setShowAddToCart] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const addToCart = ({
    totalAdult,
    totalChildren,
    totalOldAgePensioner,
    play,
  }: CartType) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { totalAdult, totalChildren, totalOldAgePensioner, play },
    });
  };

  //   const showCart = () => {
  //     dispatch({ type: "SHOW_ADD_TO_CART" });
  //   };

  return (
    <CartContext.Provider
      value={{
        ...state,
        showAddToCart,
        setShowAddToCart,
        clearCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
};
