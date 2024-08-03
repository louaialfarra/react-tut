import "./Item.css";

const Item = (props) => {
  return (
    <div className="container">
      <div className="image-container">
        <img onClick={props.click} src={props.image} />
      </div>
      <div className="text">
        <h4>{props.name}</h4>
        <h4>{props.price}</h4>
      </div>
      <button>Add to Cart</button>
    </div>
  );
};
export default Item;
