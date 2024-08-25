import "./Item2.css";

const Item2 = (props) => {
  return (
    <div class="card">
      <img className="card-image" height={70} width={70} src={props.image} />

      {/* here is the price tag   lets Keep THIS and make it for SALE
       */}
      <div class="card-price-tag">
        <span class="price-value">{props.price}</span>
      </div>

      {/* this 3 svg are for teh circles  */}

      {/* product name  */}
      <div class="card-info">
        <div class="left-info">
          <span class="product-title">
            {props.name}
            <p>descrption</p>
            {/* this spans for stars */}
          </span>
        </div>

        <div class="right-info">
          <ul class="features-list">
            <li class="list-item">
              <p class="feature-sub-title">Your title</p>
              <span class="feature-desc">Lorem ipsum dolor sit amet</span>
            </li>
            <li class="list-item">
              <p class="feature-sub-title">Your title</p>
              <span class="feature-desc">Lorem ipsum dolor sit amet</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="add-to-cart-btn">
        <button>Add to cart</button>
      </div>
    </div>
  );
};

export default Item2;
