const PostModel = require('../models/Post');
const UserModel = require('../models/User');
const CommentModel = require('../models/Comment');
const FavoriteModel = require('../models/Favorite');
const ComplaintModel = require('../models/Complaint');

exports.publishPost = async (req, res) => {

    const data = req.body;
    const post = new PostModel(data);

    try {
        await post.save().then(() => {
            UserModel.findById(data.OwnerId, (err, updateUser) => {
                if (err) {
                    return res.status(200).json({ message: err, error: true });
                } else {
                    updateUser.Post = updateUser.Post + 1
                    updateUser.save();
                    return res.status(200).json({ message: "Publish Successfully", error: false });
                }
            });
        });
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }

}

exports.getPosts = async (req, res) => {

    try {
        PostModel.find({}, (err, result) => {
            if (err) {
                return res.status(200).json({ message: err, error: true });
            }
            return res.status(200).json({ posts: result, error: false });
        })
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }

}

exports.deletePost = async (req, res) => {
    const data = req.body;
    try {
        await PostModel.findByIdAndDelete(data.postId).exec().then(() => {
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
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }
}