const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    OwnerId: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Subject: {
        type: String,
        required: true
    },
    Text: {
        type: String,
        required: true
    },
    Files: {
        type: Object,
        required: true
    },
    Comment: {
        type: Number,
        required: false
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
module.exports = mongoose.model("posts", PostSchema);