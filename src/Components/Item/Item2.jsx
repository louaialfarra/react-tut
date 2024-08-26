import "./Item2.css";

const Item2 = (props) => {
  return (
    <div class="card">
      <img className="card-image" height={70} width={70} src={props.image} />

      <div class="card-price-tag">
        <span class="price-value">ON SALE</span>
      </div>

      <div class="card-info">
        <div class="left-info">
          <span class="product-title">
            {props.name}
            <span className="price-tag">
              <p>{props.price}</p>
            </span>
          </span>
        </div>
      </div>
      <div class="add-to-cart-btn">
        <button>Add to cart</button>
      </div>
    </div>
  );
};

export default Item2;
