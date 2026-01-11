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

// Router configuration
const pages = require('./routes/pages');
const admin_pages = require('./routes/admin_pages');

app.use('/admin/pages', admin_pages);
app.use('/', pages);

// listning 
app.listen(port, () => {
    console.log(`listning on port ${port}`);
})
