import { useContext } from "react";
import { ProductContext } from "../Context/ShopContext";
import "../CSS/NewHomePage.css";
const NewHomePage = () => {
  const { category } = useContext(ProductContext);

  return (
    <div className="newhome-container">
      {category.map((cat) => (
        <div className="list-container">
          <img className="cat-img" src={cat.image?.src} />
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default NewHomePage;
