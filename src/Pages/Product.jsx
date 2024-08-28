import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../Context/ShopContext";
import Breadcrum from "../Components/Breadcrum/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";

const Product = () => {
  const { products, currentPage, addToCart, currency } =
    useContext(ProductContext);
  const { productId } = useParams();
  const [selectedAttribute, setSelectedAttribute] = useState({});

  const product = products[currentPage].find((e) => {
    return e.id === Number(productId);
  });
  if (!product) {
    return <div>Loading...</div>; // Show a loading indicator or fallback UI
  }
  const handleSelectedAttribute = (attname, option) => {
    setSelectedAttribute({
      ...selectedAttribute,
      [attname]: option,
    });
  };
  const attributes = product.attributes.map((att, i) => {
    return (
      <div key={i}>
        <h2>{att.name}</h2>
        <ul
          style={{
            paddingLeft: 0,
            gap: 20,
            display: "flex",
            listStyleType: "none",
          }}
        >
          {att.options.map((op, i) => {
            return (
              <li key={i}>
                <button onClick={() => handleSelectedAttribute(att.name, op)}>
                  {op}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
  const allAttributesSelected = product.attributes.every((att) =>
    selectedAttribute.hasOwnProperty(att.name)
  );
  const handleAddtoCart = () => {
    addToCart({ ...product, selectedAttribute });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <ProductDisplay
          key={product.id}
          name={product.name}
          image={product.images[0]?.src}
          price={product.price}
          details={attributes}
          regularprice={product.meta_data
            .filter((data) => data.key === "custom_price")
            .map((data, index) => {
              return <div key={index}>{data.value * currency}</div>;
            })}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "600px",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "space-between",
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          {product.images.map((image, index) => {
            return (
              <div key={index} style={{ display: "flex" }}>
                <img
                  src={image.src}
                  style={{
                    height: "75px",
                    width: "75px",
                    objectFit: "cover",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <h1>THIS IS PRODUCT PAGE</h1>

      <div>
        <button onClick={handleAddtoCart} disabled={!allAttributesSelected}>
          ADDto cart
        </button>
      </div>
    </div>
  );
};
export default Product;
