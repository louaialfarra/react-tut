import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context/ShopContext";
import "./Filter.css";

const FilterComponent = (props) => {
  const { products } = useContext(ProductContext);
  const [attributes, setAttributes] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const extractAttributes = () => {
      const attributeMap = {};

      products.forEach((product) => {
        product.attributes.forEach((attribute) => {
          if (!attributeMap[attribute.name]) {
            attributeMap[attribute.name] = new Set();
          }
          attribute.options.forEach((option) => {
            attributeMap[attribute.name].add(option);
          });
        });
      });
      const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

      const formatAttributes = Object.keys(attributeMap).reduce((acc, key) => {
        let sortedOptions = Array.from(attributeMap[key]);

        if (key.toLowerCase() === "size") {
          sortedOptions.sort(
            (a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
          );
        } else {
          sortedOptions.sort((a, b) => {
            const aNum = parseFloat(a);
            const bNum = parseFloat(b);
            if (isNaN(aNum) || isNaN(bNum)) {
              // Handle non-numeric values if necessary
              return a.localeCompare(b);
            }
            return aNum - bNum;
          });
        }
        acc[key] = sortedOptions;
        return acc;
        acc;
      }, {});

      setAttributes(formatAttributes);
    };

    if (products.length > 0) {
      extractAttributes();
    }
  }, [products]);

  const handleAttributeChange = (attributeName, option) => {
    setSelectedOptions((prev) => {
      const updated = { ...prev };
      const isSelected = updated[attributeName]?.includes(option);

      if (isSelected) {
        // Remove the option if it's already selected
        updated[attributeName] = updated[attributeName].filter(
          (opt) => opt !== option
        );
        if (updated[attributeName].length === 0) {
          delete updated[attributeName];
        }
      } else {
        // Add the option if it's not already selected
        if (!updated[attributeName]) {
          updated[attributeName] = [];
        }
        updated[attributeName].push(option);
      }

      // Trigger the filtering logic with the updated selected options
      props.onFilterChange(updated);
      return updated;
    });
  };

  return (
    <div className="filter-component">
      <h3>Filter by</h3>
      {Object.keys(attributes).map((attributeName) => (
        <div key={attributeName} className="attribute-group">
          <h4>{attributeName}</h4>
          {attributes[attributeName].map((option) => {
            const isChecked =
              selectedOptions[attributeName]?.includes(option) || false;
            if (attributeName.toLowerCase() === "color") {
              return (
                <label key={option} className="option-label">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() =>
                      handleAttributeChange(attributeName, option)
                    }
                    style={{ display: "none" }}
                  />
                  <span
                    className="color-box"
                    style={{
                      backgroundColor: option.toLowerCase(),
                      width: "20px",
                      height: "20px",
                      display: "inline-block",
                      margin: "0 5px",
                      cursor: "pointer",
                    }}
                  />
                </label>
              );
            } else {
              return (
                <label key={option} className="option-label">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() =>
                      handleAttributeChange(attributeName, option)
                    }
                  />
                  {option}
                </label>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterComponent;
