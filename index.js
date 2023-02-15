const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require('dotenv').config();
const authController = require('./controllers/auth');
const updateProfileController = require('./controllers/updateProfile');
const postController = require('./controllers/post');
const userController = require('./controllers/user');
const commentController = require('./controllers/comment');
const favoriteController = require('./controllers/favorite');
const complaintController = require('./controllers/complaint');
const nodemailer = require('nodemailer');
const helmet = require('helmet');

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.urlencoded(
    { extended: true }
));
app.use(helmet());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ramazanncelikk44@gmail.com',
        pass: 'dgxpwyzritkrxarb'
    }
});

transporter.verify(function (error, success) {

    if (error) throw error;
    console.log('Bağlantı başarıyla sağlandı');

});

app.post("/api/register", authController.register);
app.post("/api/login", authController.login);
app.post("/api/updateUserImage", updateProfileController.updateUserImage);
app.post("/api/updateProfile", updateProfileController.updateUser);
app.get("/api/updateEmailVerify/:userId", updateProfileController.updateEmailVerify);
app.post("/api/resetPassword", updateProfileController.updatePassword);
app.post("/api/getEmail", updateProfileController.getEmail);
app.post("/api/publishPost", postController.publishPost);
app.get("/api/getPosts", postController.getPosts);
app.get("/api/getUser/:userId", userController.getUser);
app.post("/api/deletePost", postController.deletePost);
app.post("/api/shareComment", commentController.shareComment);
app.get("/api/getComments/:postId", commentController.getComments);
app.post("/api/deleteComment", commentController.deleteComment);
app.post("/api/addFavorite", favoriteController.addFavorite);
app.get("/api/getFavorites/:userId", favoriteController.getFavorites);
app.delete("/api/deleteFavorite/:favoriteId", favoriteController.deleteFavorite);
app.post("/api/addComplaint", complaintController.addComplaint);
app.get("/api/getComplaints", complaintController.getComplaints);
app.post("/api/deleteComplaint", complaintController.deleteComplaint);

const port = process.env.PORT || 9999
app.listen(5000, () => {
    console.log(`Listening port ${port}`);
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        console.log(err ? err : "Mongoose ile bağlantı yapıldı");
    });
});