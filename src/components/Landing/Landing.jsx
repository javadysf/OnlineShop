import Divider from "../common/Divider";
import HeroSection from "./HeroSection/HeroSection";
import MostSells from "./Mosts/MostSells";

const Landing = ({ products }) => {
  return (
    <div className="w-full h-screen flex-col">
      <HeroSection />
      <Divider />
      <MostSells products={products} />
    </div>
  );
};
export default Landing;
