import { useContext } from "react";
import { ProductContext } from "../Context/ShopContext";
import Item2 from "../Components/Item/Item2";

const SaleProducts = () => {
  const { products, currency } = useContext(ProductContext);
  const saleProducts = products.filter((product) => product.on_sale);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Sale Products</h1>
      <div className="grid-container">
        {saleProducts.map((product) => {
          return (
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
                    <span key={index}>
                      {(data.value * currency).toLocaleString()}
                    </span>
                  );
                })}
              onsale={product.on_sale ? <div>SALE</div> : null}
              attnew={product.attributes}
            />
          );
        })}
      </div>
    </div>
  );
};
export default SaleProducts;
