const express = require('express');
const router = express.Router();

/**
 * GET pages index
 */
router.get('/', (req, res) => {
    res.send('Admin working');
});


/**
 * GET add page
 */
router.get('/add-page', (req, res) => {

    let title = "";
    let slug = "";
    let content = "";

    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
    })
});

// import router
module.exports = router;