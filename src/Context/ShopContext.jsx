import { useState, useEffect } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product) => {
    setCart((c) => {
      const existingProduct = c.find(
        (item) =>
          item.id === product.id &&
          JSON.stringify(item.selectedAttribute) ===
            JSON.stringify(product.selectedAttribute)
      );
      if (existingProduct) {
        return c.map((item) => {
          return item.id === product.id &&
            JSON.stringify(item.selectedAttribute) ===
              JSON.stringify(product.selectedAttribute)
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        return [...c, { ...product, quantity: 1 }];
      }
    });
  };

  const increment = (productId, selectedAtt) => {
    setCart((c) => {
      return c.map((item) =>
        item.id === productId &&
        JSON.stringify(item.selectedAttribute) === JSON.stringify(selectedAtt)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  };

  const decrement = (productId, selectedAtt) => {
    setCart((c) => {
      return c.map((item) =>
        item.id === productId &&
        JSON.stringify(item.selectedAttribute) === JSON.stringify(selectedAtt)
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      );
    });
  };
  const removeFromCart = (productId, selectedAtt) => {
    setCart((c) => {
      return c.filter(
        (item) =>
          item.id !== productId ||
          JSON.stringify(item.selectedAttribute) !== JSON.stringify(selectedAtt)
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
        currency,
        setCurrency,
        removeFromCart,
        category,
        setCategory,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ShopContextProvider;
