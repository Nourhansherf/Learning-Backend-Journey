const { body } = require('express-validator');

const middleware = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage('Title cannot be empty')
            .isLength({ min: 3 })
            .withMessage('Minimum lenght = 3'),
        body('price')
            .notEmpty()
            .withMessage('Price cannot be empty')
    ]
};

module.exports = {middleware};