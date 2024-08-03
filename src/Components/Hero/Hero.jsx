import banner from "../../assets/banner.png";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="hero-container">
      <div className="left-hero">
        <h1>New Summer Collectionxxx </h1>
        <h4>check out this ne collection now</h4>
        <button>View Now</button>
      </div>
      <div className="right-hero">
        <img src={banner} />
      </div>
    </div>
  );
};
export default Hero;
