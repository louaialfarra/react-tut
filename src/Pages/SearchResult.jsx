import React from "react";
import { useLocation } from "react-router-dom";
import Item2 from "../Components/Item/Item2";
import { ProductContext } from "../Context/ShopContext";
import { useContext } from "react";
import { useEffect } from "react";

const SearchResult = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };
  const { currency, setCurrency } = useContext(ProductContext);

  useEffect(() => {
    const fetchProductFromLocalStorage = () => {
      const storedCurrency = JSON.parse(localStorage.getItem("currency"));

      if (storedCurrency) {
        setCurrency(storedCurrency);
      }
    };
    fetchProductFromLocalStorage();
  }, [currency]);

  return (
    <div className="search-result-container">
      <h1>Search Results</h1>
      {results.length > 0 ? (
        results.map((product) => (
          <Item2
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.images[0]?.src}
            price={product.price}
            product={product}
            saleprice={product.price}
            regularprice={product.meta_data
              .filter((data) => data.key === "custom_price")
              .map((data, index) => {
                return (
                  <div key={index}>
                    {(data.value * currency).toLocaleString()}
                  </div>
                );
              })}
            onsale={product.on_sale ? <div>SALE</div> : null}
          />
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResult;
