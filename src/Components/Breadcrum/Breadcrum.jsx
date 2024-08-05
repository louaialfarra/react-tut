const Breadcrum = (props) => {
  const { product } = props;

  return (
    <div>
      HOME {product.id}
      {product.name}
    </div>
  );
};

export default Breadcrum;
