const express = require('express');
const UserModel = require('../models/users');
const router = express.Router();
const bcrypt = require('bcrypt');

// Login page route
router.get('/', (req, res) => {
    res.render('login', { title: 'Login' });
})

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
        return res.redirect('/login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.redirect('/login');
    }

    req.session.isAuth = true;
    res.redirect('/notes');
})

module.exports = router;