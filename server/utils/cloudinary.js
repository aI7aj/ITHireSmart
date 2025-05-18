import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_key,
    api_secret:process.env.CLOUDINARY_API_secret,
});

export async function cloudinaryUpload(file){
    try {
        const data=cloudinary.uploader.upload(file,{
            resource_type:"auto",
        })
        return data;
    } catch (error) {
        return error
    }
}

export async function cloudinaryremove(publicid){
    try {
        const result=cloudinary.uploader.destroy(publicid)
        return result;
    } catch (error) {
        return error
    }
    
}
