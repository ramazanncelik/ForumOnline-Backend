const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    ImageUrl: {
        type: String,
        required: false
    },
    Name: {
        type: String,
        required: false
    },
    NickName: {
        type: String,
        required: false
    },
    Biography: {
        type: String,
        required: false
    },
    Post: {
        type: Number,
        required: false
    },
    EmailVerify: {
        type: Boolean,
        required: false
    },
    Gender: {
        type: String,
        required: false
    },
    Role: {
        type: String,
        required: false
    },
});
module.exports = mongoose.model("users", UserSchema);