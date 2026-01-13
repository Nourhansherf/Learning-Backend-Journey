const express = require('express');
const router = express.Router();

// notes
router.get('/', (req, res) => {
    res.render('notes', { title: 'Your Notes' });
});

//add note
router.get('/add-note', (req, res) => {
    res.render('add-note', { title: 'Add Note' });
});

module.exports = router;