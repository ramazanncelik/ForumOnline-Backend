const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    OwnerId: {
        type: String,
        required: true
    },
    PostId: {
        type: String,
        required: true
    },
    Text: {
        type: String,
        required: true
    },
    FullDate: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    Time: {
        type: String,
        required: true
    },
    Month: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model("comments", CommentSchema);