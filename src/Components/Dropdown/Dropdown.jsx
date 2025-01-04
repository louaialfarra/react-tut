import { useRef, useState } from "react";
import "./Dropdown.css";
import { useNavigate } from "react-router-dom";

const Dropdown = (props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [subOpend, setSubOpend] = useState(null);
  const navigate = useNavigate();
  const leaveTimeout = useRef(null);

  const handleNavigation = (category) => {
    navigate(`/shopcategory/${category.toLowerCase().replace(/\s+/g, "-")}`);
    setOpenDropdown(false); // Close the dropdown after navigation
    setSubOpend(null);
  };

  const handleMouseEnter = (index) => {
    clearTimeout(leaveTimeout.current);
    setSubOpend(index);
  };

  const handleMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setSubOpend(null);
    }, 300);
  };

  const getSubCat = (parentId) => {
    return props.allCategory.filter((cat, i) => cat.parent === parentId);
  };

  return (
    <div
      className="dropdown-container"
      onClick={() => setOpenDropdown(!openDropdown)}
      //onMouseEnter={() => setOpenDropdown(true)}
      // onMouseLeave={() => setOpenDropdown(false)}
    >
      <span
        style={{ fontFamily: "sans-serif", zIndex: 10 }}
        className="dropdown-trigger"
      >
        Categories OLD
      </span>
      {openDropdown && (
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
