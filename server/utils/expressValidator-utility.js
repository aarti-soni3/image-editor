const express = require('express');
const { validationResult } = require('express-validator')
const AppError = require('../utils/AppError');
const { imageSize } = require('image-size');
const fs = require('fs').promises;

module.exports.validate = validations => {
    return async (req, res, next) => {
        for (const validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty())
                return res.status(400).json({ erros: result.array() })
        }
        next();
    }
}

module.exports.checkFileValidation = async (value, { req }) => {

    const { file } = req;

    if (!file)
        throw new AppError(400, 'File upload is required!');

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize)
        throw new AppError(400, 'file must not exceed more than 2MB');

    const allowedFormat = ['image/jpeg', 'image/jpg'];

    if (!allowedFormat.includes(file.mimetype))
        throw new AppError(400, 'Only JPEG, JPG files are allowed!');

    const buffer = await fs.readFile(file.path);
    const dimension = imageSize(buffer);

    const minHeight = 400;
    const minWidth = 400;
    const maxHeight = 768;
    const maxWidth = 1024;

    if (dimension.width > maxWidth || dimension.width < minWidth || dimension.height > maxHeight || dimension.height < minHeight) {
        throw new AppError(400, `Image must be at least ${minWidth} * ${minHeight} & not exceeding ${maxWidth} * ${maxHeight}`)
    }
    return true;
}