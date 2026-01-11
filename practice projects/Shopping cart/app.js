const express = require('express');
const path = require('path');

// use express
const port = 3000;
const app = express();

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
