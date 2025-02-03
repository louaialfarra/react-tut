import React from "react";
import Modal from "react-modal";
import FilterComponent from "../Filter/Filter";
Modal.setAppElement("#root");

const FilterPopup = (props) => {
  const customStyle = {
    backgroundColor: "red",
    content: {
      backgroundColor: "darkgray",
      color: "black",
    },
    overlay: {
      backgroundColor: "rgb(20 20 20 / 75%)",
      zIndex: 1,
    },
  };

  return (
    <div>
      <Modal
        isOpen={props.opened}
        onRequestClose={props.closed}
        contentLabel="FILTER ME "
        style={customStyle}
      >
        <FilterComponent onFilterChange={props.onFilterChangeofPops} />
        <div style={{ marginTop: "12px", placeSelf: "center" }}>
          <button
            style={{
              paddingInline: "16px",
              backgroundColor: "black",
              borderRadius: "25px",
              paddingBlock: "8px",
            }}
            onClick={props.closed}
          >
            FILTER
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default FilterPopup;
