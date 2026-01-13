const express = require('express');
const router = express.Router();

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/');
    }
}

// notes
router.get('/', isAuth , (req, res) => {
    res.render('notes', { title: 'Your Notes' });
});

//add note
router.get('/add-note', isAuth, (req, res) => {
    res.render('add-note', { title: 'Add Note' });
});

module.exports = router;