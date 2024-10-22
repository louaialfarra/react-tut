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
              <span onClick={() => handleNavigation(cat)}>{cat}</span>

              {subOpend === i && cat.parent === 0 && (
                <ul className="submenu">
                  {props.subcategories.map((subcat, j) => (
                    <li key={j} onClick={() => handleNavigation(subcat)}>
                      {subcat}
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
