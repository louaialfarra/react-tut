import { useContext } from "react";
import "./Item2.css";
import { ProductContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

const Item2 = (props) => {
  const { currency, addToCart } = useContext(ProductContext);

  const handleOnClick = () => {
    addToCart(props.product);
  };
  return (
    <div class="card">
      <Link to={`/product/${props.id}`}>
        <img className="card-image" height={70} width={70} src={props.image} />
      </Link>
      <div className={props.onsale ? "card-price-tag" : ""}>
        <span class="price-value">{props.onsale}</span>
      </div>

      <div class="card-info">
        <div class="left-info">
          <span class="product-title">
            {props.name}
            <span className="price-tag">
              <p>{(props.price * currency).toLocaleString()} &nbsp; S.P</p>
            </span>
          </span>
        </div>
      </div>
      <div class="add-to-cart-btn">
        <button onClick={handleOnClick}>Add to cart</button>
      </div>
    </div>
  );
};

export default Item2;
