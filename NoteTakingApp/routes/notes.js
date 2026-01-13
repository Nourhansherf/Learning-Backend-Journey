const express = require('express');
const router = express.Router();
const Note = require('../models/notes');
const multer = require('multer');

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/');
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

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

router.post('/upload', upload.single('image'), (req, res) => {
    res.redirect('/notes');
})

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

// view single note
router.get('/note/:id', isAuth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).lean();
        if (!note) return res.status(404).render('error', { message: 'Note not found' });
        res.render('note', { title: note.title, note });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Unable to load note', error: err });
    }
});

// edit note form
router.get('/edit-note/:id', isAuth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).lean();
        if (!note) return res.status(404).render('error', { message: 'Note not found' });
        res.render('edit-note', { title: 'Edit Note', note });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Unable to load edit form', error: err });
    }
});

// update note
router.put('/edit-note/:id', isAuth, async (req, res) => {
    try {
        await Note.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });
        res.redirect('/notes');
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Unable to update note', error: err });
    }
});

// delete note
router.delete('/delete-note/:id', isAuth, async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.redirect('/notes');
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Unable to delete note', error: err });
    }
});


module.exports = router;