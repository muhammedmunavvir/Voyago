import { Heropage } from "./Heropage";
import ImageSlider from "./Landingpage";
import { Navbar } from "./Navbar";

export const Homepage = () => {
  return (
    <div>
      <Navbar />
      <ImageSlider/>
      <Heropage/>
    </div>
  );
};
