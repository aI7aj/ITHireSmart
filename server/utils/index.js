import multer from "multer";

const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/images")
    },
    filename: (req,file,cb)=>{
        cb(null,`${req.user.id}`)
    }
});

const upload = multer({storage:storage}).single("profilePicture")

export default upload;

