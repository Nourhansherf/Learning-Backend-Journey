const mongoose = require('mongoose');

dbConnect = 'mongodb://localhost:27017/NodeJS';
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