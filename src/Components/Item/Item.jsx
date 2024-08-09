import { Link } from "react-router-dom";
import "./Item.css";
import { useContext } from "react";
import { ProductContext } from "../../Context/ShopContext";

const Item = (props) => {
  const { addToCart } = useContext(ProductContext);

  const handleOnClick = () => {
    addToCart(props.product);
  };

  return (
    <div className="container">
      <div className="image-container">
        <Link to={`/product/${props.id}`}>
          <img src={props.image} />
        </Link>
      </div>
      <div className="text">
        <h4>{props.name}</h4>
        <h4>{props.price}</h4>
        <h4> this is sale price: {props.saleprice}</h4>
      </div>
      <button onClick={() => handleOnClick()}>Add to Cart</button>
    </div>
  );
};
export default Item;
