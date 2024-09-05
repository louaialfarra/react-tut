import { useState } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
  const [opend, setOpend] = useState(false);

  return (
    <div className="dropdown-container">
      <button onClick={() => setOpend(!opend)}>Categories</button>
      {opend && (
        <ul className="dropdown-menu">
          {props.subcat.map((cat, i) => (
            <li key={i}>{cat}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
