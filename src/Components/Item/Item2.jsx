import { useContext, useState } from "react";
import "./Item2.css";
import { ProductContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

const Item2 = (props) => {
  const { currency, addToCart } = useContext(ProductContext);
  const [selectedAttribute, setSelectedAttribute] = useState({});

  const handleOnClick = () => {
    addToCart({ ...props.product, selectedAttribute });
  };
  return (
    <div className="card">
      <Link to={`/product/${props.id}`}>
        <img
          className="card-image"
          height={70}
          width={70}
          src={props.image}
          onClick={() => window.scrollTo(0, 0)}
        />
      </Link>
      <div className={props.onsale ? "card-price-tag" : ""}>
        <span className="price-value">{props.onsale}</span>
      </div>

      <div className="card-info">
        <div className="left-info">
          <span className="product-title">
            {props.name}
            <span className="price-tag">
              <p>{(props.price * currency).toLocaleString()} &nbsp; S.P</p>
            </span>
          </span>
        </div>
      </div>
      <div className="add-to-cart-btn">
        <button onClick={handleOnClick}>Add to cart</button>
      </div>
    </div>
  );
};

export default Item2;
