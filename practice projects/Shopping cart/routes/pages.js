const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('working');
});

// import router
module.exports = router;