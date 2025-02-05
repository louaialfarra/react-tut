import { useContext, useState } from "react";
import "./ProductDisplay.css";
import { ProductContext } from "../../Context/ShopContext";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductDisplay = (props) => {
  const { currency } = useContext(ProductContext);
  const [mainImage, setMainImage] = useState(props.image);
  const [selectedAttribute, setSelectedAttribute] = useState({});
  const [selectedImage, setSelectedImage] = useState(props.image);

  const handleAttributeClick = (attName, op) => {
    setSelectedAttribute({ ...selectedAttribute, [attName]: op });
    props.handleattclick(attName, op);
  };
  return (
    <div className="product2-container">
      <div className="product-title">{props.name}</div>
      <div className="single-product-container">
        <div className="container-image">
          <div className="image-gallery-container">
            {props.images.map((image, index) => (
              <div
                className={`image-gallery ${
                  selectedImage === image.src ? "selected" : ""
                }`}
                key={index}
                onClick={() => {
                  setMainImage(image.src);
                  setSelectedImage(image.src);
                }}
              >
                <img src={image.src} />
              </div>
            ))}
          </div>
          {/* this is  the big image  */}

          <div className="big-img">
            <Zoom>
              <img src={mainImage} className="img-size" />
            </Zoom>
          </div>
        </div>
        <div className="product-text-container">
          {/*<div className="product-title">{props.name}</div>*/}
          <div className="price-container">
            {props.onsale ? (
              <>
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
                <div className="new-price">
                  {(props.price * currency).toLocaleString()}&nbsp; S.P
                </div>
              </>
            ) : (
              <div className="new-price">
                {(props.price * currency).toLocaleString()}&nbsp; S.P
              </div>
            )}
          </div>
          <div className="att-container">
            {props.attnew.map((att, i) => {
              return (
                <div className="att-name" key={i}>
                  <h2>{att.name}</h2>
                  {att.name === "Color" ? (
                    <ul>
                      {att.options.map((op, i) => {
                        return (
                          <li key={i}>
                            <button
                              onClick={() => handleAttributeClick(att.name, op)}
                              style={{
                                backgroundColor: op.toLowerCase(),
                                height: "40px",
                                width: "40px",
                                cursor: "pointer",
                              }}
                              className={
                                selectedAttribute[att.name] === op
                                  ? "selected-attribute"
                                  : ""
                              }
                            ></button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <ul>
                      {att.options.map((op, i) => {
                        return (
                          <li key={i}>
                            <button
                              onClick={() => handleAttributeClick(att.name, op)}
                              style={{
                                backgroundColor: op.toLowerCase(),

                                cursor: "pointer",
                              }}
                              className={
                                selectedAttribute[att.name] === op
                                  ? "selected-attribute"
                                  : ""
                              }
                            >
                              {op}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
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
    </div>
  );
};
export default ProductDisplay;
