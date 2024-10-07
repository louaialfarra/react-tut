import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ShopContext";
import Item2 from "../Components/Item/Item2";
import { useParams } from "react-router-dom";

const Category = () => {
  const { products, currency, setCurrency } = useContext(ProductContext);
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Retrieve filtered products for the specific category from localStorage
    const savedProducts = localStorage.getItem(`filteredProducts_${category}`);
    const storedCurrency = JSON.parse(localStorage.getItem("currency"));

    if (storedCurrency) {
      setCurrency(storedCurrency);
    }

    if (savedProducts) {
      // Parse and set filtered products from local storage
      setFilteredProducts(JSON.parse(savedProducts));
    } else if (products && products.length > 0) {
      // If products exist, filter based on category
      const filter = products.filter(
        (product) => product.categories[0].slug === category
      );
      setFilteredProducts(filter);
      // Save the filtered products to localStorage for future refreshes
      localStorage.setItem(
        `filteredProducts_${category}`,
        JSON.stringify(filter)
      );
    }
  }, [category, products, setCurrency]);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      // Ensure that the filtered products are saved for the specific category
      localStorage.setItem(
        `filteredProducts_${category}`,
        JSON.stringify(filteredProducts)
      );
    }
  }, [filteredProducts, category]);

  return (
    <div>
      <h1>{category.toUpperCase()}</h1>
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
