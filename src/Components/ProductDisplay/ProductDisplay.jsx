import { useContext, useState } from "react";
import "./ProductDisplay.css";
import { ProductContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { currency } = useContext(ProductContext);
  const [mainImage, setMainImage] = useState(props.image);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className="container-image">
          <div className="image-gallery-container">
            {props.images.map((image, index) => (
              <div
                className="image-gallery"
                key={index}
                onClick={() => {
                  setMainImage(image.src);
                }}
              >
                <img src={image.src} />
              </div>
            ))}
          </div>

          {/* this is  the big image  */}
          <img src={mainImage} />
        </div>
        <div>
          <div className="product-title">{props.name}</div>
          <div className="price-container">
            <div className="new-price">
              {(props.price * currency).toLocaleString()}&nbsp; S.P
            </div>
            <div className="old-price">
              {props.regularprice
                .filter((data) => data.key === "custom_price")
                .map((data, index) => {
                  return (
                    <span key={index}>
                      {(data.value * currency).toLocaleString()} &nbsp;S.p
                    </span>
                  );
                })}
            </div>
          </div>
          <div className="att-container">
            {props.attnew.map((att, i) => {
              return (
                <div className="att-name" key={i}>
                  <h2>{att.name}</h2>
                  <ul>
                    {att.options.map((op, i) => {
                      return (
                        <li key={i}>
                          <button
                            onClick={() => props.handleattclick(att.name, op)}
                          >
                            {op}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="button-container">
            <button onClick={props.addtocart} disabled={!props.attcheck}>
              ADD to cart
            </button>
          </div>
        </div>
      </div>
      <h3> </h3>
      <h2> this is details{props.details}</h2>
      <h1> this is new attr</h1>
      this is product display
    </div>
  );
};
export default ProductDisplay;
