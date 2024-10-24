import { useState } from "react";
import "./Dropdown.css";
import { useNavigate } from "react-router-dom";

const Dropdown = (props) => {
  const [opend, setOpend] = useState(false);
  const [subOpend, setSubOpend] = useState(null);
  const navigate = useNavigate();

  const handleNavigation = (category) => {
    navigate(`/shopcategory/${category.toLowerCase().replace(/\s+/g, "-")}`);
    setOpend(false); // Close the dropdown after navigation
    setSubOpend(null);
  };
  const handleMouseEnter = (index) => {
    setSubOpend(index);
  };
  const handleMouseLeave = () => {
    setSubOpend(null);
  };
  const getSubCat = (parentId) => {
    return props.allCategory.filter((cat, i) => cat.parent === parentId);
  };

  return (
    <div className="dropdown-container">
      <button onClick={() => setOpend(!opend)}>Categories</button>
      {opend && (
        <ul className="dropdown-menu">
          {props.subcat.map((cat, i) => (
            <li
              key={i}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              <span onClick={() => handleNavigation(cat.name)}>{cat.name}</span>

              {subOpend === i && getSubCat(cat.id).length > 0 && (
                <ul className="submenu">
                  {getSubCat(cat.id).map((subcat, j) => (
                    <li key={j} onClick={() => handleNavigation(subcat.name)}>
                      {subcat.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
