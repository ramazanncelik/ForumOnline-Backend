const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    OwnerId: {
        type: String,
        required: true
    },
    PostId: {
        type: String,
        required: true
    },
    UserId: {
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
module.exports = mongoose.model("favorites", FavoriteSchema);