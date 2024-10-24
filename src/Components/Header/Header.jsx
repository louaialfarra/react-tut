import { useContext, useEffect, useState } from "react";
import logo from "../../assets/hooboo-logo.png";
import "./Header.css";
import { json, Link } from "react-router-dom";
import Search from "../Search/Search";
import cartImage from "../../assets/cart.png";
import Dropdown from "../Dropdown/Dropdown";
import { ProductContext } from "../../Context/ShopContext";

function Header() {
  const [menu, setMenu] = useState("home");
  const [storedCategory, setStoredCategory] = useState([]);

  const { category } = useContext(ProductContext);

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
        <div className="logo">
          <img src={logo} />
        </div>
        <Search />
        <div className="Text">
          <h3>Online Shop</h3>
        </div>
      </div>

      <div className="header-right">
        <div className="menu">
          <ul>
            <li
              onClick={() => {
                setMenu("home");
              }}
            >
              <Link style={{ textDecoration: "none", color: "unset" }} to={"/"}>
                Home
              </Link>
              {menu === "home" ? <hr /> : <></>}
            </li>
            <li
              onClick={() => {
                setMenu("shop");
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "unset" }}
                to={"/shopcategory"}
              >
                Shop
              </Link>
              {menu === "shop" ? <hr /> : <></>}
            </li>
            <li className="exclude">
              <Dropdown
                subcat={storedCategory.filter(
                  (cat, i) => cat.parent === 0 && cat.name !== "Uncategorized"
                )}
                allCategory={storedCategory}
              />

              {console.log("this is stored cat" + storedCategory)}
            </li>

            <li
              onClick={() => {
                setMenu("about");
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "unset" }}
                to={"about"}
              >
                About Us
              </Link>
              {menu === "about" ? <hr /> : <></>}
            </li>
          </ul>
        </div>
        <div
          onClick={() => {
            setMenu("cart");
          }}
          className="cart"
        >
          <Link to={"./cart"}>
            <img src={cartImage} />
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Header;
