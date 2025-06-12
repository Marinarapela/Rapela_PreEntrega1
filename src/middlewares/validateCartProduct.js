const { param, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const validateCartProduct = [
    param('cid').custom(value => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('El ID del carrito (cid) debe ser un ObjectId válido');
        }
            return true;
    }),
    param('pid').custom(value => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('El ID del producto (pid) debe ser un ObjectId válido');
        }
            return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateCartProduct;

