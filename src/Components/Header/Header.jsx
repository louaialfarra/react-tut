import { useState } from "react";
import logo from "../../assets/hooboo-logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import cartImage from "../../assets/cart.png";
import Dropdown from "../Dropdown/Dropdown";

function Header() {
  const [menu, setMenu] = useState("home");
  const subcat = ["Top", "Jacket", "Dress"];

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
              <Dropdown subcat={subcat} />
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
