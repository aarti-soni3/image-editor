const sharp = require("sharp");
const { Caman } = require("caman");
const fs = require("fs");
const { cloudinary, uploadImageToServer } = require("../utils/cloudinaryConfig");
const { deleteTempFile } = require("../utils/fileUtility");
const { verifyToken } = require("../utils/jsonwebtoken-utility");
const Image = require("../Models/Image");
const AppError = require("../utils/AppError");

const cropImage = async (req, res) => {
  const { file } = req;

  const imageData = JSON.parse(req.body.imageData);
  const filterData = JSON.parse(req.body.filterData);
  const { width, height, x, y } = imageData;
  const { brightness, saturation, exposure, contrast, vibrance, sepia, hue, sharpen } = filterData;

  const originalImagePath = `uploads/original-images/${file.filename}`;
  const cropImagePath = `uploads/crop-images/output-${file.filename}`;
  const filterImagePath = `uploads/filter-images/output-${file.filename}`;

  await sharp(file.path)
    .extract({ left: x, top: y, width: width, height: height })
    .toFile(cropImagePath);

  const uploadLink = await new Promise((resolve, reject) => {
    Caman(`uploads/crop-images/output-${file.filename}`, function () {
      this.brightness(brightness)
        .contrast(contrast)
        .saturation(saturation)
        .exposure(exposure)
        .vibrance(vibrance)
        .sharpen(sharpen)
        .hue(hue)
        .sepia(sepia);

      this.render(async function () {
        try {
          const dataURL = this.toBase64();
          const link = await uploadImageToServer(dataURL)
          deleteTempFile(cropImagePath)
          deleteTempFile(originalImagePath)
          resolve(link)
        } catch (error) {
          reject(error)
        }
      });
    });
  })

  const data = {
    imageLink: uploadLink?.secure_url || uploadLink?.url,
    userId: req?.decodedUser?.data?.userId
  }

  const image = await Image.create(data);
  return res.status(200).json({ image: uploadLink.secure_url, message: "image uploaded" });

  throw new AppError(500, "Something went wrong!");
  // return res.status(500).json({ message: "Something went wrong!" });
};

module.exports = { cropImage }