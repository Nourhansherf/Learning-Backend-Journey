const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const verifyToken = require('../middleware/verifyToken');

const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, filel, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];

    if (imageType === 'image') {
        cb(null, true);
    } else {
        cb({msg: "File type isn't allowed"}, false)
    }
}
const upload = multer({
    storage: diskStorage,
    fileFilter
});

//get all users
// register
// login

router.route('/')
    .get(verifyToken, usersController.getAllUsers)

router.route('/register')
    .post(upload.single('avatar'), usersController.register)

router.route('/login')
    .post(usersController.login)

module.exports = router;