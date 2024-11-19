import { useContext, useEffect, useState, useRef } from "react";
import logo from "../../assets/hooboo-logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import cartImage from "../../assets/cart.png";
import Dropdown from "../Dropdown/Dropdown";
import { ProductContext } from "../../Context/ShopContext";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Header() {
  const [menu, setMenu] = useState("home");
  const [storedCategory, setStoredCategory] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref to track the menu element

  const { category } = useContext(ProductContext);

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
      <div className="header-left">
        <BurgerMenu Tmenu={toggleMenu} />

        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <Search />
        <div className="Text">
          <h3>Online Shop</h3>
        </div>
      </div>

      <div className="header-right">
        <div className="menu">
          <ul>
            <li onClick={() => setMenu("home")}>
              <Link style={{ textDecoration: "none", color: "unset" }} to={"/"}>
                Home
              </Link>
              {menu === "home" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("shop")}>
              <Link
                style={{ textDecoration: "none", color: "unset" }}
                to={"/shopcategory"}
              >
                Shop
              </Link>
              {menu === "shop" ? <hr /> : null}
            </li>
            <li className="exclude">
              <Dropdown
                subcat={storedCategory.filter(
                  (cat) => cat.parent === 0 && cat.name !== "Uncategorized"
                )}
                allCategory={storedCategory}
              />
            </li>
            <li onClick={() => setMenu("about")}>
              <Link
                style={{ textDecoration: "none", color: "unset" }}
                to={"about"}
              >
                About Us
              </Link>
              {menu === "about" ? <hr /> : null}
            </li>
          </ul>
        </div>
        <div onClick={() => setMenu("cart")} className="cart">
          <Link to={"./cart"}>
            <img src={cartImage} alt="Cart" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
