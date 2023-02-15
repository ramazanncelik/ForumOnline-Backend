const UserModel = require('../models/User');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ramazanncelikk44@gmail.com',
        pass: 'dgxpwyzritkrxarb'
    }
});

exports.updateUserImage = async (req, res) => {
    const id = req.body.userId;
    const file = req.body.file;

    try {
        UserModel.findById(id, (err, updateUserImage) => {
            updateUserImage.ImageUrl = file
            updateUserImage.save();
            return res.status(200).json({ message: "Update Successfully.", error: false });
        });
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }
}

exports.updateUser = async (req, res) => {
    const data = req.body.data;
    try {
        UserModel.findById(data.userId, (err, updateUser) => {
            updateUser.NickName = data.nickName
            updateUser.Name = data.name
            updateUser.Gender = data.gender
            updateUser.Biography = data.biography
            updateUser.Password = data.password === "" ? updateUser.Password : data.password
            updateUser.save();
            return res.status(200).json({ message: "Update Successfully.", error: false });
        });
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }
}

exports.updateEmailVerify = async (req, res) => {
    const userId = req.params.userId;
    try {
        UserModel.findById(userId, (err, updateUser) => {
            updateUser.EmailVerify = true;
            updateUser.save();
            return res.send("Email Verify");
        });
    } catch (error) {
        return res.send("Error");
    }
}

exports.updatePassword = async (req, res) => {
    const data = req.body;
    try {
        await UserModel.findOneAndUpdate({ Email: data.userEmail }, { Password: data.newPassword });
        return res.status(200).json({ message: "Update Successfully.", error: false });
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }
}

exports.getEmail = async (req, res) => {
    const data = req.body;
    try {
        if (data.emailType === "emailConfirmation") {
            UserModel.find({ Email: data.userEmail, EmailVerify: false }, (err, user) => {
                if (user.length !== 0) {
                    let mail = {
                        from: 'Ramazan Çelik <ramazanncelikk44@gmail.com>',
                        to: data.userEmail,
                        subject: data.subject,
                        text: data.text,
                        html: data.html,
                    };

                    transporter.sendMail(mail, function (err, info) {

                        if (err) return res.status(200).json({ message: error, error: true });
                        else return res.status(200).json({ message: "Posta Gönderildi Lütfen E-posta Adresinizi Kontrol Edin.", error: false });

                    });
                } else {
                    return res.status(200).json({ message: "Email Onaylama Zaten Yapılmış", error: true });
                }
            });
        } else if (data.emailType === "resetPassword") {
            let mail = {
                from: 'Ramazan Çelik <ramazanncelikk44@gmail.com>',
                to: data.userEmail,
                subject: data.subject,
                text: data.text,
                html: data.html,
            };

            transporter.sendMail(mail, function (err, info) {

                if (err) return res.status(200).json({ message: error, error: true });
                else return res.status(200).json({ message: "Posta Gönderildi Lütfen E-posta Adresinizi Kontrol Edin.", error: false });

            });
        }
    } catch (error) {
        return res.send("Error");
    }
}