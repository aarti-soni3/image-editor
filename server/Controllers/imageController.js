const sharp = require('sharp')

const cropImage = async (req, res) => {
    const { file } = req;
    const imageData = JSON.parse(req.body.imageData)
    const { width, height, x, y, rotate, scaleX, scaleY } = imageData

    const croppedImage = await sharp(file.path)
        .extract({ left: x, top: y, width: width, height: height })
        .toFile(`output/output-${file.filename}`)

    res.status(200).json({ data: { file: file, message: 'image uploaded' } })
}

module.exports = { cropImage }