const cloudinary = require('cloudinary').v2;
const CloudinaryStorage = require('multer-storage-cloudinary');
const path = require('path')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        asset_folder: 'image-editor',
        public_id_prefix: 'image-edit'
        // folder: 'image-editor',
        // allowed_formats: ['jpg', 'jpeg', 'png'],
        // public_id: (req, file) => {
        //     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        //     return `${file.fieldname}-${uniqueSuffix}`
        // },
    }
})

const uploadImageToServer = async (image) => {
    try {
        const response = await cloudinary.uploader.upload(image, {
            folder: 'image-editor',
            use_filename: true,
            unique_filename: true,
        })
        console.log('url :', response.secure_url)
        return response
    } catch (error) {
        console.log(error)
    }
}

//checking connction
// cloudinary.api.ping().then((result) => console.log(result)).catch((error) => console.log(error))

module.exports = { cloudinary, storage, uploadImageToServer }