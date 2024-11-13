import { useContext, useState } from "react";
import axios from "axios";
import { ProductContext } from "../Context/ShopContext";

const Checkout = () => {
  const WOO_URL = import.meta.env.VITE_WOO_API_URL;
  const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
  const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;

  const [firstname, Setfirstname] = useState("");
  const [lastname, Setlastname] = useState("");
  const [address, SetAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { cart, currency } = useContext(ProductContext);

  const handleSubmite = async () => {
    const lineItems = cart.map((item) => {
      //the .tofixed is very important to let  the price  be passed to  woocomerce wesbite
      const priceInCurrency = (item.price * currency).toFixed(2); // Convert to two decimal places
      const totalInCurrency = (priceInCurrency * item.quantity).toFixed(2);
      return {
        product_id: item.id,
        quantity: item.quantity,
        price: priceInCurrency,
        total: totalInCurrency,

        meta_data: Object.keys(item.selectedAttribute).map((key) => ({
          key: key,
          value: item.selectedAttribute[key],
        })),
      };
    });
    const orderdata = {
      payment_method: "cod",
      payment_method_title: "Cash on Delivery",
      status: "processing",

      billing: {
        first_name: firstname,
        last_name: lastname,
        address_1: address,
      },
      shipping: {
        first_name: firstname,
        last_name: lastname,
        address_1: address,
      },
      shipping_lines: [
        {
          method_id: "local_pickup",
          method_title: "Local Pickup",
        },
      ],
      line_items: lineItems, // thsi is where u have to list cart porducts
      currency: "SYP",
    };
    try {
      setLoading(true);
      const response = await axios.post(`${WOO_URL}/orders`, orderdata, {
        params: {
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET,
        },
      });
      setOrderSuccess(true);
      console.log("Order successfully created:", response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  console.log("this is checkout" + cart);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {orderSuccess ? (
        <p>Your order was placed successfully!</p>
      ) : (
        <div>
          {cart.map((item) => item.price)}
          NAME :
          <input
            type="text"
            value={firstname}
            onChange={(e) => Setfirstname(e.target.value)}
          />
          last name:
          <input
            type="text"
            value={lastname}
            onChange={(e) => Setlastname(e.target.value)}
          />
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => SetAddress(e.target.value)}
          />
          <button onClick={handleSubmite}>Submite Order</button>
        </div>
      )}
    </div>
  );
};
export default Checkout;
