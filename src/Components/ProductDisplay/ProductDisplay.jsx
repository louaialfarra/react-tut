import { useContext } from "react";
import "./ProductDisplay.css";
import { ProductContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { currency } = useContext(ProductContext);
  return (
    <div>
      <div className="container-image">
        <img src={props.image} />
        <div className="image-gallery-container">
          {props.images.map((image, index) => (
            <div className="image-gallery" key={index}>
              <img src={image.src} />
            </div>
          ))}
        </div>
      </div>
      <h1>{props.name}</h1>
      <h3>
        old Price is
        {props.regularprice
          .filter((data) => data.key === "custom_price")
          .map((data, index) => {
            return <div key={index}>{data.value * currency}</div>;
          })}
      </h3>
      <h3> the Price is {props.price * currency}</h3>
      <h2> this is details{props.details}</h2>
      this is product display
    </div>
  );
};
export default ProductDisplay;
