require('dotenv').config();
const express = require('express');
const status = require('./utils/httpStatusText');
const path = require('path');

const app = express();
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const coursesRouter = require('./routes/courses.route');
app.use('/api/courses', coursesRouter);

const usersRouter = require('./routes/users.route');
app.use('/api/users', usersRouter);

app.all('/*path', (req, res, next) => {
    res.status(400).json({
        status: status.ERROR,
        data: null,
        error: {
            msg: 'Page not found'
        }
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`connected on port ${port}`);
})