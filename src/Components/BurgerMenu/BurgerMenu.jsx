import "./BurgerMenu.css";

const BurgerMenu = (props) => {
  return (
    <div className="burger-menu" onClick={props.Tmenu}>
      <div className="burger" />
      <div className="burger" />
      <div className="burger" />
    </div>
  );
};
export default BurgerMenu;
