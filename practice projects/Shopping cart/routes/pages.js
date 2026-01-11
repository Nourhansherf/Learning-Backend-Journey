const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'home'});
});

// import router
module.exports = router;