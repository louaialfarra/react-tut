import { useContext } from "react";
import { ProductContext } from "../Context/ShopContext";
import NewHomePage from "./NewHomePage";
import Category from "./Category";
const Shopcategory = () => {
  const { products } = useContext(ProductContext);
  let { currentPage } = useContext(ProductContext);

  return (
    <div>
      <NewHomePage />
    </div>
  );
};
export default Shopcategory;
