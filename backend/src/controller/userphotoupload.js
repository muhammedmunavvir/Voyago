
export const profilepicupload=async(req,res)=>{
  console.log(req.url)
    if(!req.file){
        return res.status(400).json({ message: "No file uploaded" });
    }
   return res.json({ imageUrl: req.file.path }); // Cloudinary URL
}  