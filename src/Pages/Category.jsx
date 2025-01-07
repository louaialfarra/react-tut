import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ShopContext";
import Item2 from "../Components/Item/Item2";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewHomePage from "./NewHomePage";

const Category = () => {
  const WOO_URL = import.meta.env.VITE_WOO_API_URL;
  const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
  const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;
  const CURRENCY = import.meta.env.VITE_WOO_API_CURRENCY;

  const { products, setProducts, setCurrency, currency } =
    useContext(ProductContext);
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { totalPages, setTotalPages } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [continueFetch, setContinueFetch] = useState(false);

  const fetchProduct = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    try {
      const response = await axios.get(`${WOO_URL}/products`, {
        params: {
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET,
          status: "publish",
          per_page: 50,
          page,
        },
      });

      const products1 = response.data;

      /*if (!totalPages) {
        setTotalPages(parseInt(response.headers["x-wp-totalpages"]));
      }*/
      const totalPagesFromHeader = parseInt(
        response.headers["x-wp-totalpages"]
      );
      setTotalPages(totalPagesFromHeader);

      if (page === 1) {
        setProducts(products1);
      } else {
        setProducts((prevProducts) => {
          return [...prevProducts, ...products1];
        });
      }
      setContinueFetch(true);

      localStorage.setItem("products", JSON.stringify(response.data));

      console.log("this is product varioans" + products1);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedCurrency = JSON.parse(localStorage.getItem("currency"));

    if (storedCurrency) {
      setCurrency(storedCurrency);
    }
    // Need to add else fetch the currency
  }, []);

  useEffect(() => {
    // Fetch page 1 first
    if (products.length === 0) {
      fetchProduct(1);
    } else {
      const filter = products.filter((product) => {
        if (category === "all") {
          return true;
        }
        if (category === "bottoms") {
          const bottomCategory = [
            "pants",
            "jeans",
            "legging",
            "shorts",
            "skirt",
          ];
          return product.categories.some((cat) =>
            bottomCategory.includes(cat.slug)
          );
        }
        if (category === "tops") {
          const topCategory = ["t-shirt", "hoodies", "sweater", "shirt"];
          return product.categories.some((cat) =>
            topCategory.includes(cat.slug)
          );
        } else {
          console.log("  no id category ");

          return product.categories.some((cat) => cat.slug === category);
        }
      });
      console.log("  the filter is " + filter);

      setFilteredProducts(filter);
      // the issue of fetchin category was the filter the product inside the if
      // Filter products based on category or specific ID for "bottoms"
    }
    setContinueFetch(true);
  }, [products, category]);

  useEffect(() => {
    if (continueFetch && totalPages > 1) {
      // after to many tsst  the promble with fetch that it need to be synch and awaited
      const fetchRemainingPages = async () => {
        for (let page = 2; page <= totalPages; page++) {
          await fetchProduct(page);
        }
      };
      fetchRemainingPages();
    }
    setContinueFetch(false); // Stop fetching once all pages are fetched
  }, [totalPages]); // Runs when totalPages or continueFetch changes
  return (
    <div>
      <NewHomePage />
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
          );
        })}
      </div>
    </div>
  );
};

export default Category;
