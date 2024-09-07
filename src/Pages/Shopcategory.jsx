import { useContext } from "react";
import { ProductContext } from "../Context/ShopContext";
const Shopcategory = () => {
  const { products } = useContext(ProductContext);
  let { currentPage } = useContext(ProductContext);

  return (
    <div>
      <h1>This is Categoory</h1>
      {products[currentPage]?.map((product, i) => {
        return (
          <ul>
            <li>{product.name}</li>
          </ul>
        );
      })}
    </div>
  );
};
export default Shopcategory;
