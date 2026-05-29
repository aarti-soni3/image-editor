const express = require('express');
const { validationResult } = require('express-validator')

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