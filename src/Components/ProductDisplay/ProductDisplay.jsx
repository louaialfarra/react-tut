const ProductDisplay = (props) => {
  return (
    <div>
      <img src={props.image} />
      <h1>{props.name}</h1>
      <h3> the Price is {props.price}</h3>
      this is product display
    </div>
  );
};
export default ProductDisplay;
