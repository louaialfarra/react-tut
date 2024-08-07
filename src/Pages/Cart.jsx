import { useContext } from "react";
import { ProductContext } from "../Context/ShopContext";
import "../CSS/Cart.css";
const Cart = () => {
  const { cart } = useContext(ProductContext);
  console.log(cart);
  if (cart.length === 0) return <div>Your cart is empty.</div>;
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.map((item, index) => (
        <div key={index}>
          <h4>{item.name}</h4>
          <p>{item.price}</p>
          <img src={item.images[0].src} alt={item.name} />
        </div>
      ))}
    </div>
  );
};
export default Cart;
