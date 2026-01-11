const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

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

/**
 * POST add page
 */
router.post('/add-page',
    // validation middleware
    [
        body('title').notEmpty().withMessage('Title must have a value'),
        body('content').notEmpty().withMessage('Content must have a value')
    ],
    (req, res) => {

        let title = req.body.title;
        let slug = (req.body.slug || '').replace(/\s+/g, '-').toLowerCase();
        let content = req.body.content;

        if (slug == "") slug = title.replace(/\s+/g, '-').toLowerCase();

        const errorsResult = validationResult(req);

        if (!errorsResult.isEmpty()) {
            res.render('admin/add_page', {
                errors: errorsResult.array(),
                title: title,
                slug: slug,
                content: content
            });
        } else {
            console.log('success');
            // TODO: save page to DB
        }

    });

// import router
module.exports = router;