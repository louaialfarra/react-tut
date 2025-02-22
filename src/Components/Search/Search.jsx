import axios from "axios";
import "./Search.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FullScreenLoader from "../Loader/FullScreenLoader";

const Search = (props) => {
  const WOO_URL = import.meta.env.VITE_WOO_API_URL;
  const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
  const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;

  const [search, setSearch] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleMouseOut = () => {
    setInputValue("");
  };

  const handleSearchChange = async (e) => {
    const input = e.target.value;
    setSearch(input);
    console.log(input);
    /*if (input.length > 2) {
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
    }*/
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchButton();
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setDropDown(false);
  };

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };
  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  const handleSearchButton = async () => {
    if (search.length > 2) {
      setLoading(true);
      disableScroll();

      try {
        const response = await axios.get(
          `${WOO_URL}/products?search=${search}`,
          {
            params: {
              consumer_key: CONSUMER_KEY,
              consumer_secret: CONSUMER_SECRET,
              status: "publish",
              per_page: 100,
            },
          }
        );
        navigate("/searchresult", { state: { results: response.data } });
      } catch (e) {
        console.error("Error fetching products: ", e);
        setDropDown(false);
      } finally {
        setLoading(false);
        enableScroll();
      }
    } else {
      setDropDown(false);
    }
  };

  return (
    <div
      className={`search-container ${props.customStyle ? `custom-style` : ""}`}
    >
      {loading && <FullScreenLoader />}
      <div style={{ position: "relative", width: "100%" }}>
        <input
          className="search-input"
          style={props.inputStyle}
          type="text"
          value={search}
          placeholder="Search products..."
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
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
      {/* <div className="new-search">
        <div className="box">
          <input
            type="text"
            name="txt"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onMouseOut={handleMouseOut}
            className="input"
          />
          <SearchIcon
            sx={{
              top: "50%",
              position: "absolute",
              right: 15,
              color: "white",
              transform: "translate(-50%, -50%)",
              "&hover": {
                opacity: "0",
                zIndex: "-1",
              },
            }}
            className="search-icon"
          />
        </div>
      </div> */}
      <div onClick={handleSearchButton}>
        <SearchIcon
          sx={{ fontSize: "32px", marginLeft: "15px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Search;
