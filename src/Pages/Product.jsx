import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../Context/ShopContext";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";

const Product = () => {
  const { products, currentPage, addToCart, currency, setCurrency } =
    useContext(ProductContext);
  const { productId } = useParams();
  const [selectedAttribute, setSelectedAttribute] = useState({});
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductFromLocalStorage = () => {
      const storedProducts = JSON.parse(localStorage.getItem("products"));
      const storedCurrency = JSON.parse(localStorage.getItem("currency"));

      if (storedCurrency) {
        setCurrency(storedCurrency);
      }

      if (products[currentPage]) {
        const foundProduct = products[currentPage].find(
          (e) => e.id === Number(productId)
        );
        if (foundProduct) {
          setProduct(foundProduct);
          localStorage.setItem("products", JSON.stringify(products));
        }
      } else if (storedProducts && storedProducts[currentPage]) {
        const foundproduct = storedProducts[currentPage].find(
          (e) => e.id === Number(productId)
        );

        if (foundproduct) {
          setProduct(foundproduct); // Set the product from localStorage
          return;
        }
      }
    };

    fetchProductFromLocalStorage();
  }, [productId, currentPage, currency, products]);

  if (!product) {
    return <div>Loading...</div>; // Show a loading indicator or fallback UI
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
