import { useContext, useEffect, useState, useRef } from "react";
import logo from "../../assets/hooboo-logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import { ProductContext } from "../../Context/ShopContext";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

function Header() {
  const [menu, setMenu] = useState("home");
  const [storedCategory, setStoredCategory] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref to track the menu element

  const navigate = useNavigate();
  const { category, cart } = useContext(ProductContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setStoredCategory(JSON.parse(savedCategories));
    } else if (category && category.length > 0) {
      setStoredCategory(category);
      localStorage.setItem("categories", JSON.stringify(category));
    }
  }, [category]);

  return (
    <div className="header-container">
      <div className="header-top">
        <div className="header-left">
          <div className="burg-menu">
            <BurgerMenu Tmenu={toggleMenu} />
          </div>

          <div className="search-bar">
            <Search />
          </div>
        </div>
        <div className="header-mid">
          <div
            style={{ cursor: "pointer" }}
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="Logo" />
          </div>
        </div>
        <div className="header-right">
          <div onClick={() => setMenu("cart")} className="cart">
            <Link
              to={"./cart"}
              style={{ textDecoration: "none", color: "unset" }}
            >
              <div className="cart-num">{cart.length}</div>

              <ShoppingCartIcon sx={{ color: "white", fontSize: "x-large" }} />
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          flex: 1,
        }}
        className="mob-searchbar"
      >
        <Search
          customStyle={true}
          inputStyle={{ width: "90%", margin: "10px", borderRadius: "40px" }}
        />
      </div>
      <div className="header-bot">
        <div className="menu">
          <ul>
            <li onClick={() => setMenu("home")}>
              <Link style={{ textDecoration: "none", color: "unset" }} to={"/"}>
                Home
              </Link>
              {menu === "home" ? <hr /> : null}
            </li>
            <li>
              <Link
                to={"/newhomepage"}
                style={{ textDecoration: "none", color: "unset" }}
              >
                NEW HOME PAGE
              </Link>
            </li>
            <li onClick={() => setMenu("shop")}>
              <Link
                style={{ textDecoration: "none", color: "unset" }}
                to={"/shopcategory/all"}
              >
                Categories
              </Link>

              {menu === "shop" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("saleproducts")}>
              <Link
                style={{ textDecoration: "none", color: "unset" }}
                to={"/saleproducts"}
              >
                Sale Products
              </Link>
              {menu === "saleproducts" ? <hr /> : null}
            </li>

            {/* <li className="exclude">
              <Dropdown
                subcat={storedCategory.filter(
                  (cat) => cat.parent === 0 && cat.name !== "Uncategorized"
                )}
                allCategory={storedCategory}
              />
            </li>*/}

            <li onClick={() => setMenu("about")}>
              <Link
                style={{ textDecoration: "none", color: "unset" }}
                to={"about"}
              >
                About Us
              </Link>
              {menu === "about" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("test")}>
              <Link
                style={{ textDecoration: "none", color: "unset" }}
                to={"test"}
              >
                Test Scroll
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
