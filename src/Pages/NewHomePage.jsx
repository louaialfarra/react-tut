import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ShopContext";
import "../CSS/NewHomePage.css";
import { useNavigate } from "react-router-dom";

const NewHomePage = () => {
  const { category } = useContext(ProductContext);
  const [newCat, setNewCat] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (category) => {
    navigate(`/shopcategory/${category.toLowerCase().replace(/\s+/g, "-")}`);
  };

  useEffect(() => {
    const savedCategory = localStorage.getItem("categories");
    if (savedCategory) {
      const parsedCategories = JSON.parse(savedCategory);
      const filteredCategories = parsedCategories.filter(
        (cat) => cat.name !== "Uncategorized"
      );
      setNewCat(filteredCategories);
    } else if (category && category.length > 0) {
      const filteredCategories = category.filter(
        (cat) => cat.name !== "Uncategorized"
      );
      setNewCat(filteredCategories);
    }
  }, []);

  return (
    <div className="newhome-container">
      {newCat.map((cat) => (
        <div
          key={cat.name}
          className="list-container"
          onClick={() => {
            setSelectedCat(cat.name);
            handleNavigation(cat.name);
          }}
        >
          <img
            className={`cat-img ${selectedCat === cat.name ? "selected" : ""}`}
            src={cat.image?.src}
          />
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default NewHomePage;
