require('dotenv').config();
const mongoose = require('mongoose');

dbConnect = process.env.MONGOURI;
mongoose.connect(dbConnect)
    .then(() => {
        console.log('Database connected');
    });


const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});


module.exports = mongoose.model('Course ', courseSchema);