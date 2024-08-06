import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../Context/ShopContext";
import Breadcrum from "../Components/Breadcrum/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";

const Product = () => {
  const { products } = useContext(ProductContext);

  const { productId } = useParams();
  const product = products.find((e) => {
    return e.id === Number(productId);
  });
  if (!product) {
    return <div>Loading...</div>; // Show a loading indicator or fallback UI
  }
  return (
    <div>
      <h1>THIS IS PRODUCT PAGE </h1>
      <ProductDisplay
        name={product.name}
        image={product.images[0]?.src}
        price={product.price}
      />
    </div>
  );
};
export default Product;
