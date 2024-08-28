import { useContext } from "react";
import "./ProductDisplay.css";
import { ProductContext } from "../../Context/ShopContext";
const ProductDisplay = (props) => {
  const { currency } = useContext(ProductContext);
  return (
    <div>
      <div className="container-image">
        <img src={props.image} />
      </div>
      <h1>{props.name}</h1>
      <h3> old Price is {props.regularprice}</h3>
      <h3> the Price is {props.price * currency}</h3>
      <h2> this is details{props.details}</h2>
      this is product display
    </div>
  );
};
export default ProductDisplay;
