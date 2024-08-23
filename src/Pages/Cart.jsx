import { useContext } from "react";
import { ProductContext } from "../Context/ShopContext";
import "../CSS/Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, increment, decrement } = useContext(ProductContext);

  if (cart.length === 0) return <div>Your cart is empty.</div>;
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.map((item, index) => {
        console.log("this is cart ", item);
        return (
          <div key={index}>
            <h4>{item.name}</h4>
            <p>{item.price}</p>
            <img src={item.images[0].src} alt={item.name} />

            {item.selectedAttribute &&
              Object.keys(item.selectedAttribute).map((att, i) => (
                <p key={i}>
                  {att}: {item.selectedAttribute[att]}
                </p>
              ))}

            <h1>{item.quantity}</h1>

            <button onClick={() => increment(item.id, item.selectedAttribute)}>
              Incriment +
            </button>
            <button onClick={() => decrement(item.id, item.selectedAttribute)}>
              Decriment -{" "}
            </button>
          </div>
        );
      })}
      <Link className="style-button" to={"./checkout"}>
        {" "}
        chckout
      </Link>
    </div>
  );
};
export default Cart;
