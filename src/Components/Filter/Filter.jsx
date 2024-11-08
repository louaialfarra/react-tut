import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context/ShopContext";

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

      const formatAttributes = Object.keys(attributeMap).reduce((acc, key) => {
        acc[key] = Array.from(attributeMap[key]);
        return acc;
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
      <h3>Filter by Attributes</h3>
      {Object.keys(attributes).map((attributeName) => (
        <div key={attributeName} className="attribute-group">
          <h4>{attributeName}</h4>
          {attributes[attributeName].map((option) => {
            const isChecked =
              selectedOptions[attributeName]?.includes(option) || false;
            return (
              <label key={option} className="option-label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleAttributeChange(attributeName, option)}
                />
                {option}
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterComponent;
