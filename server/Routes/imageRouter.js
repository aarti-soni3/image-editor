const express = require('express');
const router = express.Router();
const imageController = require('../Controllers/imageController');
const multer = require('multer');
const { asyncHandler } = require('../utils/catchAsyncUtility');
const path = require('path');
const { validate } = require('../utils/expressValidator-utility');
const { body } = require('express-validator')
// const { storage } = require('../utils/cloudinaryConfig');
const authMiddleware = require('../middleware/authMiddlware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/original-images')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage });
router.route('/crop').post(upload.single('image'), authMiddleware.verifyToken, validate([body('').custom((value, { req }) => {
    if (!req.file)
        throw new Error('File upload is required!');
    return true;
})]), asyncHandler(imageController.cropImage))

module.exports = router