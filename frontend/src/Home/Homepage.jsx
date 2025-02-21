

import  {Dealsyou}  from "./Dealsyou";

// import { Heropage } from "./Heropage";
import { Hiddengems } from "./Hiddengems";
import ImageSlider from "./Landingpage";
import { MarqueeDemohorizently } from "../pages/MarqueeeUI";
import { Heropage } from "./Heropage";


export const Homepage = () => {
  return (
    <div>
    
      <ImageSlider/>
      <Heropage/>
      <Dealsyou/>
      <MarqueeDemohorizently/>
      <Hiddengems/> 
      
     
    
    </div>
  );
};
