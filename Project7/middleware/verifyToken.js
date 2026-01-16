require('dotenv').config();
const jwt = require('jsonwebtoken');
const status = require('../utils/httpStatusText');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authHeader){
        res.status(400).json({
            status: status.ERROR,
            data: {msg: 'Token is required'}
        })
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (err) {
        return res.status(400).json({
            status: status.ERORR,
            data: {msg: 'Invalid token'}
        })
    }
}

module.exports = verifyToken;