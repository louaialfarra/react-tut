import { useState } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ShopContextProvider;
