
import { Dealsyou } from "./Dealsyou";
import Footer from "./Footer";
import { Heropage } from "./Heropage";
import { Hiddengems } from "./Hiddengems";
import ImageSlider from "./Landingpage";


export const Homepage = () => {
  return (
    <div>
    
      <ImageSlider/>
      <Heropage/>
      <Dealsyou/>
      <Hiddengems/> 
      <Footer/>
    </div>
  );
};
