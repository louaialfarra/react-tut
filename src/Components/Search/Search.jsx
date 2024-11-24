import axios from "axios";
import "./Search.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const WOO_URL = import.meta.env.VITE_WOO_API_URL;
  const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
  const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;

  const [search, setSearch] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
    const input = e.target.value;
    setSearch(input);

    if (input.length > 2) {
      try {
        const response = await axios.get(
          `${WOO_URL}/products?search=${input}`,
          {
            params: {
              consumer_key: CONSUMER_KEY,
              consumer_secret: CONSUMER_SECRET,
              status: "publish",
            },
          }
        );
        setSearchResult(response.data);
        setDropDown(true);
      } catch (e) {
        console.error("Error fetching products: ", e);
        setDropDown(false);
      }
    } else {
      setDropDown(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setDropDown(false);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        style={{ width: "100%", padding: "8px" }}
        type="text"
        value={search}
        placeholder="Search products..."
        onChange={handleSearchChange}
      />
      {dropDown && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "4px",
            zIndex: 1000,
            listStyleType: "none",
            padding: 0,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {searchResult.length > 0 ? (
            searchResult.map((product) => (
              <li
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  color: "Black",
                }}
              >
                <img style={{ width: 50 }} src={product.images[0]?.src} />
                {product.name}
              </li>
            ))
          ) : (
            <li style={{ padding: "8px" }}>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
