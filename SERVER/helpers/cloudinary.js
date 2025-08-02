const cloudinary=require('cloudinary').v2;
const multer=require('multer')

cloudinary.config({
        cloud_name: 'dndhqv6lr', 
        api_key: '878415561579925', 
        api_secret: 'BRjPAgg5SZCqTSQspuAQJ4DFZyQ'
})

const storage =new multer.memoryStorage();

async function ImageUploadUtil(file) {
    const result =await cloudinary.uploader.upload(file,{
        resource_type:'auto'
    })
    return result;
}

const upload=multer({storage});
module.exports={upload,ImageUploadUtil}