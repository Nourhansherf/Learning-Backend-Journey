require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var session = require('express-session');
// body-parser express-session express-validator express message

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

// bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// express session conf
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // secure should be true only when using HTTPS; keep false for local dev
    cookie: { secure: false }
}));

// Note: express-validator v6+ does not provide a global middleware function.
// Use validation chains (check, body) and validationResult inside route handlers.
// The old global `expressValidator()` middleware was removed — remove its usage here.

// express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Router configuration
const pages = require('./routes/pages');
const admin_pages = require('./routes/admin_pages');

app.use('/admin/pages', admin_pages);
app.use('/', pages);

// listning 
app.listen(port, () => {
    console.log(`listning on port ${port}`);
})
