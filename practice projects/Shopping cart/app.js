require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// use express
const port = 3000;
const app = express();

// connect to db 
mongoose.connect(process.env.database)
    .then(() => {
        console.log(`connected to db`);
    });

// set views 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use public 
app.use(express.static(path.join(__dirname, 'public')));

// initial get 
app.get('/', (req, res) => {
    res.send('working');
});

// listning 
app.listen(port, () => {
    console.log(`listning on port ${port}`);
})
