import { useState } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const addToCart = (product) => {
    setCart((c) => {
      const existingProduct = c.find((item) => item.id === product.id);
      if (existingProduct) {
        return c.map((item) => {
          return item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else return [...c, { ...product, quantity: 1 }];
    });
  };

  const increment = (productId) => {
    setCart((c) => {
      return c.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };
  const decrement = (productId) => {
    setCart((c) => {
      return c.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      );
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        increment,
        decrement,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ShopContextProvider;
