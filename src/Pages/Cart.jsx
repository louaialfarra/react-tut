import { useContext } from "react";
import { ProductContext } from "../Context/ShopContext";
import "../CSS/Cart.css";
import { Link } from "react-router-dom";
import CartItem from "../Components/Item/CartItem";

const Cart = () => {
  const { cart, increment, decrement, removeFromCart, currency, setCurrency } =
    useContext(ProductContext);
  const storedCurrency = JSON.parse(localStorage.getItem("currency"));

  if (storedCurrency) {
    setCurrency(storedCurrency);
  }
  if (cart.length === 0) return <div>Your cart is EMPTY.</div>;

  const calculateTotal = (cart) => {
    return cart.reduce(
      (acc, item) => {
        acc.totalPrice += item.price * item.quantity * currency;
        acc.totalQuantity += item.quantity;
        return acc;
      },
      { totalPrice: 0, totalQuantity: 0 }
    );
  };
  const total = calculateTotal(cart);

  return (
    <div className="cart-container">
      <div className="invoice">
        <h3 style={{ flex: 3 }}>Product</h3>
        <h3 style={{ flex: 1 }}>Price</h3>
        <h3 style={{ flex: 1 }}>Quantity</h3>
        <h3 style={{ flex: 1 }}>SubTotal</h3>
        <span style={{ flex: 1 / 4 }}></span>
      </div>
      {cart.map((item, index) => {
        console.log("this is cart ", item);
        return (
          <div key={index}>
            <CartItem
              name={item.name}
              price={(item.price * currency).toLocaleString()}
              image={item.images[0].src}
              att={
                item.selectedAttribute &&
                Object.keys(item.selectedAttribute).map((att, i) => (
                  <span key={i}>
                    {att}: {item.selectedAttribute[att]}
                  </span>
                ))
              }
              quantity={item.quantity}
              inc={() => increment(item.id, item.selectedAttribute)}
              dec={() => decrement(item.id, item.selectedAttribute)}
              sub={(item.quantity * (item.price * currency)).toLocaleString()}
              trash={() => {
                removeFromCart(item.id, item.selectedAttribute);
              }}
            />
          </div>
        );
      })}
      <div>
        <h1>
          TOTAL
          <p>Total Price: {total.totalPrice.toLocaleString()}</p>{" "}
          <p>Total Quantity: {total.totalQuantity}</p>
        </h1>
      </div>

      <Link className="style-button" to={"./checkout"}>
        chckout
      </Link>
    </div>
  );
};
export default Cart;
