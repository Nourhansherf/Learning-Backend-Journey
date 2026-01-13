const mongoose = require('mongoose');
const userSchema = mongoose.Schema;

const Users = new userSchema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        unique: true,
    }
});

module.exports = mongoose.model('User', Users);