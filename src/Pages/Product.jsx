import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../Context/ShopContext";
import Breadcrum from "../Components/Breadcrum/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";

const Product = () => {
  const { products, currentPage } = useContext(ProductContext);

  const { productId } = useParams();
  const product = products[currentPage].find((e) => {
    return e.id === Number(productId);
  });
  if (!product) {
    return <div>Loading...</div>; // Show a loading indicator or fallback UI
  }

  const attributes = product.attributes[0]?.options.map((att, i) => {
    return (
      <ul key={i}>
        <li>{att}</li>
      </ul>
    );
  });
  console.log(product.attributes);
  return (
    <div>
      <h1>THIS IS PRODUCT PAGE {attributes} </h1>
      <ProductDisplay
        key={product.id}
        name={product.name}
        image={product.images[0]?.src}
        price={product.price}
      />
    </div>
  );
};
export default Product;
