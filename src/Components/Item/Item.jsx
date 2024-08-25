import { Link } from "react-router-dom";
import "./Item.css";
import { useContext } from "react";
import { ProductContext } from "../../Context/ShopContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Item = (props) => {
  const { addToCart, currency } = useContext(ProductContext);

  const handleOnClick = () => {
    addToCart(props.product);
  };

  return (
    <div className="container">
      <div className="image-container">
        <Link to={`/product/${props.id}`}>
          <img src={props.image || <Skeleton />} />
        </Link>
      </div>
      <div className="text">
        <h4>{props.name || <Skeleton />}</h4>
        <h4>{props.price * currency || <Skeleton />}</h4>
        <h4>sale price: {props.saleprice * currency || <Skeleton />}</h4>
        <h4>regular price: {props.regularprice || <Skeleton />}</h4>
      </div>
      <button onClick={() => handleOnClick()}>Add to Cart</button>
    </div>
  );
};
export default Item;
