import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Shopcategory from "./Pages/Shopcategory";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shopcategory" element={<Shopcategory />} />
          <Route path="/about" element={<About />} />

          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
