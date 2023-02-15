const ComplaintModel = require('../models/Complaint');
const UserModel = require('../models/User');
const CommentModel = require('../models/Comment');
const FavoriteModel = require('../models/Favorite');
const PostModel = require('../models/Post');

exports.addComplaint = async (req, res) => {

    const data = req.body;
    const complaint = new ComplaintModel(data);

    try {
        await complaint.save().then(() => {
            return res.status(200).json({ message: "Complaint Successfully", error: false });
        });
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }

}

exports.getComplaints = async (req, res) => {

    try {
        ComplaintModel.find({}, (err, result) => {
            if (err) {
                return res.status(200).json({ message: err, error: true });
            }
            return res.status(200).json({ complaints: result, error: false });
        })
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }

}

exports.deleteComplaint = async (req, res) => {
    const data = req.body;
    try {
        if (data.userId) {
            PostModel.findByIdAndDelete(data.postId).exec()
                .then(() => {
                    UserModel.findById(data.userId, (err, updateUser) => {
                        if (err) {
                            return res.status(200).json({ message: err, error: true });
                        } else {
                            updateUser.Post = updateUser.Post - 1
                            updateUser.save();
                            CommentModel.find({ PostId: data.postId }, (err, result) => {
                                for (let i = 0; i < result.length; i++) {
                                    CommentModel.findByIdAndDelete(result[i]._id).exec();
                                }
                            });
                            FavoriteModel.find({ PostId: data.postId }, (err, result) => {
                                for (let i = 0; i < result.length; i++) {
                                    FavoriteModel.findByIdAndDelete(result[i]._id).exec();
                                }
                            });
                            ComplaintModel.find({ PostId: data.postId }, (err, result) => {
                                for (let i = 0; i < result.length; i++) {
                                    ComplaintModel.findByIdAndDelete(result[i]._id).exec();
                                }
                            });
                            return res.status(200).json({ message: "Post Deleted Successfully", error: false });
                        }
                    });
                });
        } else {
            ComplaintModel.findByIdAndDelete(data.complaintId).exec()
                .then(() => {
                    return res.status(200).json({ message: "Complaint Deleted Successfully", error: false });
                });
        }
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }
}