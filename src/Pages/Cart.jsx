import { useContext } from "react";
import { ProductContext } from "../Context/ShopContext";
import "../CSS/Cart.css";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cart, increment, decrement } = useContext(ProductContext);
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
          <h1>{item.quantity}</h1>
          <button onClick={() => increment(item.id)}>Incriment +</button>
          <button onClick={() => decrement(item.id)}>Decriment - </button>
        </div>
      ))}
      <Link className="style-button" to={"./checkout"}>
        {" "}
        chckout
      </Link>
    </div>
  );
};
export default Cart;
