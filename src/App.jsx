import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Shopcategory from "./Pages/Shopcategory";
import Product from "./Pages/Product";
import ShopContextProvider from "./Context/ShopContext";
import Checkout from "./Pages/Checkout";
import Footer from "./Components/Footer/Footer";
import Category from "./Pages/Category";
import NewHomePage from "./Pages/NewHomePage";
import SearchResult from "./Pages/SearchResult";

function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="newhomepage" element={<NewHomePage />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/searchresult" element={<SearchResult />} />
          <Route path="/shopcategory" element={<Shopcategory />} />
          <Route path="shopcategory/:category" element={<Category />} />

          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App;
