import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { CartType, InitialStateType } from "../types";
import reducer from "../reducers/cartReducer";
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
  adult: 0,
  setAdult: () => {},
  childrens: 0,
  setChildrens: () => {},
  oldAgePensioner: 0,
  setOldAgePensioner: () => {},
};

const CartContext = createContext<InitialStateType>(initialState);

export const CartProvider = ({ children }: CartProviderProp) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [adult, setAdult] = useState(0);
  const [childrens, setChildrens] = useState(0);
  const [oldAgePensioner, setOldAgePensioner] = useState(0);

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
    totalPrice,
  }: CartType) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        totalAdult,
        totalChildren,
        totalOldAgePensioner,
        play,
        totalPrice,
      },
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
        adult,
        setAdult,
        childrens,
        setChildrens,
        oldAgePensioner,
        setOldAgePensioner,
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
