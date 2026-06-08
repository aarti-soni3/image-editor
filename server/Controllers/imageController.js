const sharp = require("sharp");
const { Caman } = require("caman");
const fs = require("fs");
const { cloudinary, uploadImageToServer } = require("../utils/cloudinaryConfig");
const { deleteTempFile } = require("../utils/fileUtility");

const cropImage = async (req, res) => {
  const { file } = req;
  const imageData = JSON.parse(req.body.imageData);
  const filterData = JSON.parse(req.body.filterData);
  const { width, height, x, y, rotate, scaleX, scaleY } = imageData;
  const { brightness, saturation, exposure, contrast, vibrance, sepia, hue,/*sharpen*/ } = filterData;

  console.log('data :::::: ', file.filename, file.path, imageData, filterData);

  const originalImagePath = `uploads/original-images/${file.filename}`;
  const cropImagePath = `uploads/crop-images/output-${file.filename}`;
  const filterImagePath = `uploads/filter-images/output-${file.filename}`;

  await sharp(file.path)
    .extract({ left: x, top: y, width: width, height: height })
    .toFile(cropImagePath);

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
      const dataURL = this.toBase64();
      const uploadLink = await uploadImageToServer(dataURL)
      deleteTempFile(cropImagePath)
      deleteTempFile(originalImagePath)

      //   this.save(`uploads/edited-images/output-${file.filename}`, function () {
      //     console.log("filter completed!!!");
      //   }),

      // Try nodeSave instead of save if standard save fails
      // if (this.nodeSave) {
      //   this.nodeSave(filterImagePath, true);
      //   deleteTempFile(cropImagePath);
      //   deleteTempFile(originalImagePath);
      // } else {
      //   this.save(filterImagePath);
      //   deleteTempFile(cropImagePath);
      //   deleteTempFile(originalImagePath);
      // }
    });
  });

  //   try {
  //     await new Promise((resolve, reject) => {
  //       Caman(file, function () {
  //         this.brightness(brightness)
  //           .contrast(contrast)
  //           .saturation(saturation)
  //           .exposure(exposure)
  //           .vibrance(vibrance);

  //         this.render(() => {
  //           //   this.save(tempPath, () => {
  //           console.log("Caman filtering complete");
  //           resolve();
  //           //   });
  //         });
  //       }).on("error", (err) => reject(err)); // Handle Caman errors
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }

  res.status(200).json({ data: { file: file, message: "image uploaded" } });
};

module.exports = { cropImage }