import "./ProductDisplay.css";
const ProductDisplay = (props) => {
  return (
    <div className="container-image">
      <img src={props.image} />
      <h1>{props.name}</h1>
      <h3> the Price is {props.price}</h3>
      <h2> this is details{props.details}</h2>
      this is product display
    </div>
  );
};
export default ProductDisplay;
