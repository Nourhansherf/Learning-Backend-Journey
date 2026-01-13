const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostSchema = new schema({
    title: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', PostSchema);