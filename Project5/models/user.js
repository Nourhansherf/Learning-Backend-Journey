const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: String,
    userMail: String,
})

module.exports = mongoose.model('users', userSchema);