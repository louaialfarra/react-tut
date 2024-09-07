import { useState } from "react";
import "./Dropdown.css";
import { useNavigate } from "react-router-dom";

const Dropdown = (props) => {
  const [opend, setOpend] = useState(false);
  const navigate = useNavigate();

  const handlNavigation = (category) => {
    navigate(`/shopcategory/${category.toLowerCase()}`); // Navigate to the dynamic path
    setOpend(false); // Close the dropdown after navigation
  };

  return (
    <div className="dropdown-container">
      <button onClick={() => setOpend(!opend)}>Categories</button>
      {opend && (
        <ul className="dropdown-menu">
          {props.subcat.map((cat, i) => (
            <li key={i} onClick={() => handlNavigation(cat)}>
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
