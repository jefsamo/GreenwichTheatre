import CartCard from "../../components/CartCard/CartCard";
import { useCartContext } from "../../context/cartContext";
import { CartType } from "../../types";

const Cart = () => {
  const { cart } = useCartContext();
  return (
    <div className="container">
      <div className="cart-container">
        {cart?.map((item: CartType, i) => {
          return <CartCard key={i} cart={item} />;
        })}
      </div>
    </div>
  );
};

export default Cart;
