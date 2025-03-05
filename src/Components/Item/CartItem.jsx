import "./CartItem.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CartItem = (props) => {
  return (
    <div className="cart-container">
      <div className="invoice-label">
        <div className="product-label">
          <div style={{ display: "flex" }}>
            <div className="cart-image-container">
              <img src={props.image} />
            </div>
            <div className="product-name">
              <h3 style={{ margin: "0px" }}>{props.name}</h3>
              <div>{props.att}</div>
            </div>
          </div>
        </div>
        <div className="price-label">
          <div className="price-name">{props.price} SYP</div>
        </div>
        <div className="quantity-label">
          <div className="quantity-name">
            <button onClick={props.inc}> + </button>
            <span style={{ padding: "10px" }}>{props.quantity}</span>
            <button onClick={props.dec}> - </button>
          </div>
        </div>
        <div className="sub-label">
          <div className="sub-name">{props.sub} SYP</div>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", flex: 1 / 4 }}
          onClick={props.trash}
        >
          <DeleteForeverIcon sx={{ color: "red" }} />
        </div>
      </div>
      <div className="line"></div>
    </div>
  );
};
export default CartItem;
