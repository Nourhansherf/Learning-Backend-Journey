const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('register', {title: 'Register'});
});

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
        return res.redirect('/register');
    }
    const hashed = await bcrypt.hash(password, 12);
    user = new UserModel({
        username,
        email,
        password: hashed
    });

    await user.save();
    res.redirect('/login');
})

module.exports = router;