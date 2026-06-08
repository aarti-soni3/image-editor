const sharp = require("sharp");
const { Caman } = require("caman");
const fs = require("fs");
const { cloudinary, uploadImageToServer } = require("../utils/cloudinaryConfig");
const { deleteTempFile } = require("../utils/fileUtility");
const { verifyToken } = require("../utils/jsonwebtoken-utility");
const Image = require("../Models/Image");

const cropImage = async (req, res) => {
  const { file } = req;

  if (!file)
    return res.status(400).json({ message: 'No file Uploaded!' })

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res.status(401).json({ message: 'Invalid or missing Token!' });

  const decodedUser = await verifyToken(token, process.env.ACCESSTOKEN_KEY);
  console.log(decodedUser)
  if (!decodedUser)
    return res.status(403).json({ message: 'Invalid User!' })

  const imageData = JSON.parse(req.body.imageData);
  const filterData = JSON.parse(req.body.filterData);
  const { width, height, x, y, rotate, scaleX, scaleY } = imageData;
  const { brightness, saturation, exposure, contrast, vibrance, sepia, hue,/*sharpen*/ } = filterData;

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
        //   .sharpen(sharpen)
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

  console.log('upload link before create: ', uploadLink)
  const data = {
    imageLink: uploadLink?.secure_url || uploadLink?.url,
    userId: decodedUser.data.userId
  }

  try {
    const image = await Image.create(data);
    return res.status(200).json({ data: { image: uploadLink.secure_url }, message: "image uploaded" });
  } catch (error) {
    console.log(error)
  }

  return res.status(500).json({ message: "Something went wrong!" });
};

module.exports = { cropImage }