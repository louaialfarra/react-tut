import { Link } from "react-router-dom";
import "./Item.css";

const Item = (props) => {
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
      </div>
      <button>Add to Cart</button>
    </div>
  );
};
export default Item;
