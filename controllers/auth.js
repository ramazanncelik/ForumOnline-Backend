const UserModel = require('../models/User')

exports.register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const nickName = req.body.nickName;

    const user = new UserModel({
        Email: email,
        Password: password,
        ImageUrl: 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        Name: '',
        NickName: nickName,
        Biography: '',
        Post: 0,
        EmailVerify: false,
        Gender: '',
        Role: 'User'
    });

    UserModel.find({ Email: email }, (err, result) => {
        if (err) {
            return res.status(200).json({ message: err, error: true });
        }
        if (result.length === 0) {
            try {
                user.save();
                return res.status(200).json({ message: 'Registration Successful.', error: false });
            } catch (error) {
                return res.status(200).json({ message: error, error: true });
            }
        } else {
            return res.status(200).json({ message: `There is already a user using ${email} mail.`, error: true });
        }
    })
}

exports.login = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    UserModel.find({ Email: email, Password: password }, (err, result) => {
        if (err) {
            return res.status(200).json({ message: err, error: true });
        }
        if (result.length === 0) {
            try {
                return res.status(200).json({ message: 'Please Check Your İnformation', error: true });
            } catch (error) {
                return res.status(200).json({ message: error, error: true });
            }
        } else {
            return res.status(200).json({ user: result[0] });
        }
    });
}