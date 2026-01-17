const status = require('../utils/httpStatusText');

module.exports = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return res.status(401).json({
                status: status.ERROR,
                data: {msg: 'You cannot delete course'}
            })
        }
        next();
    }
}