const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    OwnerId: {
        type: String,
        required: true
    },
    PostId: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Detail: {
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
module.exports = mongoose.model("complaints", ComplaintSchema);