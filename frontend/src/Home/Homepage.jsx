

import  {Dealsyou}  from "./Dealsyou";
import Footer from "./Footer";
// import { Heropage } from "./Heropage";
import { Hiddengems } from "./Hiddengems";
import ImageSlider from "./Landingpage";
import { MarqueeDemoVertical } from "../pages/ui";
import { Heropage } from "./Heropage";


export const Homepage = () => {
  return (
    <div>
    
      <ImageSlider/>
      <Heropage/>
      <Dealsyou/>
      <MarqueeDemoVertical/>
      <Hiddengems/> 
      <Footer/>
     
    
    </div>
  );
};
