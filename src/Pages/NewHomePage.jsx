import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ShopContext";
import "../CSS/NewHomePage.css";
const NewHomePage = () => {
  const { category } = useContext(ProductContext);
  const [newCat, setNewCat] = useState([]);

  useEffect(() => {
    const savedCategory = localStorage.getItem("categories");
    if (savedCategory) {
      setNewCat(JSON.parse(savedCategory));
    } else if (category && category.length > 0) {
      setNewCat(category);
      localStorage.setItem("categories", JSON.stringify(category));
    }
  }, []);
  return (
    <div className="newhome-container">
      {newCat.map((cat) => (
        <div className="list-container">
          <img className="cat-img" src={cat.image?.src} />
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default NewHomePage;
