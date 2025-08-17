
import hero from "../assets/hero.png";
import Example from "./Example";

const Hero = () => {
  return (
    <div>
      <img src={hero} className="w-full max-h-[600px] object-cover" alt="Hero banner" />
      <Example />
    </div>
  );
};

export default Hero;
