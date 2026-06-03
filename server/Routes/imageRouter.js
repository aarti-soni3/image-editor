const express = require('express');
const router = express.Router();
const imageController = require('../Controllers/imageController');
const multer = require('multer');
const { catchAsync } = require('../utils/catchAsyncUtility');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage })

router.route('/crop').post(upload.single('image'), catchAsync(imageController.cropImage))

module.exports = router