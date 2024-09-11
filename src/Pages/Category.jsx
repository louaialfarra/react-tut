import { useContext } from "react";
import { ProductContext } from "../Context/ShopContext";
import Item2 from "../Components/Item/Item2";
import { useParams } from "react-router-dom";

const Category = (props) => {
  const { products } = useContext(ProductContext);
  let { currentPage } = useContext(ProductContext);
  const { category } = useParams();

  return (
    <div>
      THIS IS CAT
      {products[currentPage]
        .filter((product) => product.categories[0].slug === category)
        .map((product, i) => {
          return (
            <Item2
              key={i}
              id={product.id}
              name={product.name}
              image={product.images[0]?.src}
              price={product.price}
              product={product}
              saleprice={product.price}
              onsale={product.on_sale ? <div>SALE</div> : null}
            />
          );
        })}
    </div>
  );
};

export default Category;
