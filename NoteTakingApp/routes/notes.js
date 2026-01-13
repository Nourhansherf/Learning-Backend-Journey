const express = require('express');
const router = express.Router();
const Note = require('../models/notes');

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/');
    }
}

// notes
router.get('/', isAuth, async (req, res) => {
    try {
        const notes = await Note.find().lean();
        res.render('notes', { title: 'Your Notes', data: notes });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Unable to load notes', error: err });
    }
});

//add note
router.get('/add-note', isAuth, (req, res) => {
    res.render('add-note', { title: 'Add Note' });
});

// post create note
router.post('/add-note', isAuth, async (req, res) => {
    try {
        const newNote = new Note({
            title: req.body.title,
            body: req.body.body,
        });

        await newNote.save();
        res.redirect('/notes');
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Unable to add note', error: err });
    }
});


module.exports = router;