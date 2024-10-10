import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../Context/ShopContext";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import axios from "axios";

const Product = () => {
  const { products, currentPage, addToCart, currency, setCurrency } =
    useContext(ProductContext);
  const { productId } = useParams();
  const [selectedAttribute, setSelectedAttribute] = useState({});
  const [product, setProduct] = useState(null);

  const WOO_URL = import.meta.env.VITE_WOO_API_URL;
  const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
  const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;
  const CURRENCY = import.meta.env.VITE_WOO_API_CURRENCY;
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${WOO_URL}/products/${productId}`, {
        params: {
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET,
        },
      });
      const result = response.data;
      setProduct(result);
    } catch (e) {}
  };
  useEffect(() => {
    const fetchProductFromLocalStorage = () => {
      const storedCurrency = JSON.parse(localStorage.getItem("currency"));

      if (storedCurrency) {
        setCurrency(storedCurrency);
      }

      if (products) {
        const foundProduct = products.find((e) => e.id === Number(productId));
        if (foundProduct) {
          setProduct(foundProduct);
        }
      } else {
        fetchProduct();
      }
    };
    fetchProductFromLocalStorage();
  }, [productId, currentPage, currency, products]);

  if (!product) {
    fetchProduct();
    return <div>Loading...</div>;
  }

  const handleSelectedAttribute = (attname, option) => {
    setSelectedAttribute({
      ...selectedAttribute,
      [attname]: option,
    });
  };

  const allAttributesSelected = product.attributes.every((att) =>
    selectedAttribute.hasOwnProperty(att.name)
  );

  const handleAddtoCart = () => {
    addToCart({ ...product, selectedAttribute });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ProductDisplay
          key={product.id}
          name={product.name}
          image={product.images[0]?.src}
          price={product.price}
          regularprice={product.meta_data}
          images={product.images}
          attcheck={allAttributesSelected}
          addtocart={handleAddtoCart}
          attnew={product.attributes}
          handleattclick={handleSelectedAttribute}
        />
      </div>
      <h1>THIS IS PRODUCT PAGE</h1>
    </div>
  );
};
export default Product;
