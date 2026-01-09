import express from 'express';
import bodyParser from 'body-parser';
import { check, validationResult } from 'express-validator';



const app = express();

const port = 5000;

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// set templating engine
app.set('view engine', 'hbs');

//navigation
app.get('', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', urlencodedParser, [
    check('username', 'This username is invalid')
        .isLength({ min: 3 })
        .exists(),
    check('email', 'This email is invalid')
        .isEmail()
        .normalizeEmail(),
],  (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(422).json({ errors: errors.array() });
        const alert = errors.array();
        res.render('register', {alert})
    }
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});