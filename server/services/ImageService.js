// const { Caman } = require("caman");
// const { deleteTempFile } = require("../utils/fileUtility");
// const { cloudinary, uploadImageToServer } = require("../utils/cloudinaryConfig");

// module.exports.filterAndUploadImage = async (file, cropImagePath, originalImagePath) => {
//     return await new Promise((resolve, reject) => {
//         Caman(`uploads/crop-images/output-${file.filename}`, function () {
//             this.brightness(brightness)
//                 .contrast(contrast)
//                 .saturation(saturation)
//                 .exposure(exposure)
//                 .vibrance(vibrance)
//                 //   .sharpen(sharpen)
//                 .hue(hue)
//                 .sepia(sepia);

//             this.render(async function () {
//                 try {
//                     const dataURL = this.toBase64();
//                     const link = await uploadImageToServer(dataURL)
//                     deleteTempFile(cropImagePath)
//                     deleteTempFile(originalImagePath)
//                     resolve(link)
//                 } catch (error) {
//                     reject(error)
//                 }
//             });
//         });
//     })
// }