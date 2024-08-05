import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../Context/ShopContext";
import Breadcrum from "../Components/Breadcrum/Breadcrum";

const Product = () => {
  const { products } = useContext(ProductContext);

  const { productId } = useParams();

  const product = products.find((e) => {
    e.id === Number(productId);
  });

  return (
    <div>
      <h1>THIS IS PRODUCT PAGE </h1>
      <Breadcrum product={product} />
    </div>
  );
};
export default Product;
