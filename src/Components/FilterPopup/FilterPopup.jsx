import React from "react";
import Modal from "react-modal";
import FilterComponent from "../Filter/Filter";
Modal.setAppElement("#root");

const FilterPopup = (props) => {
  const customStyle = {
    content: {
      backgroundColor: "gray",
      color: "black",
    },
    overlay: {
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
        <button onClick={props.closed}>FILTER</button>
      </Modal>
    </div>
  );
};
export default FilterPopup;
