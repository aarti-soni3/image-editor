const express = require('express')
const router = express.Router();
const authController = require('../Controllers/AuthController');
const { validate } = require('../utils/expressValidator-utility');
const { body } = require('express-validator');
const { catchAsync } = require('../utils/catchAsyncUtility');

router.route('/register').post(validate([
    body('name').isLength({ min: 3, max: 20 }).withMessage("Must be at least 3 characters"),
    body("username").isLength({ min: 3, max: 20 }).withMessage("Must be at least 3 characters"),
    body('mobile').isNumeric().withMessage("Must be digit only!").isLength({ min: 10, max: 10 }).withMessage("Must be 10 characters"),
    body('email').isEmail().withMessage("Invalid Email-id !"),
    body('password').isLength({ min: 8, max: 30 }).withMessage("Password must be 8 character long!")
]), catchAsync(authController.register));

router.route('/login').post(validate([
    body("username").isLength({ min: 3 }).withMessage("Must be at least 3 characters"),
    body('password').isLength({ min: 8 }).withMessage("Password must be 8 character long!")
]), catchAsync(authController.login));

router.route('/access').get(validate([body("accessToken").isEmpty().withMessage('AccessToken is missing!')]), catchAsync(authController.access));

module.exports = router