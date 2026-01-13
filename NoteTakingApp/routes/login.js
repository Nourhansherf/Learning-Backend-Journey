const express = require('express');

const router = express.Router();

// Login page route
router.get('/', (req, res) => {
    res.render('login', { title: 'Login' });
})

module.exports = router;