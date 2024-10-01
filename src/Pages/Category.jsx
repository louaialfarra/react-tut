import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ShopContext";
import Item2 from "../Components/Item/Item2";
import { useParams } from "react-router-dom";

const Category = (props) => {
  const { products, currency, setCurrency } = useContext(ProductContext);
  let { currentPage } = useContext(ProductContext);
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem(`filteredProducts_${category}`);
    const storedCurrency = JSON.parse(localStorage.getItem("currency"));

    if (storedCurrency) {
      setCurrency(storedCurrency);
    }

    if (savedProducts) {
      setFilteredProducts(JSON.parse(savedProducts));
    } else if (products) {
      const filter = products.filter(
        (product) => product.categories[0].slug === category
      );
      setFilteredProducts(filter);
    }
  }, [category, products, currentPage]);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      localStorage.setItem(
        "filteredProducts",
        JSON.stringify(filteredProducts)
      );
    }
  }, [filteredProducts, category]);
  return (
    <div>
      <h1>{category.toLocaleUpperCase()}</h1>
      <div className="grid-container">
        {filteredProducts.map((product, i) => {
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
    </div>
  );
};

export default Category;
