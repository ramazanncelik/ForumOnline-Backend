const PostModel = require('../models/Post');
const CommentModel = require('../models/Comment');

exports.shareComment = async (req, res) => {

    const data = req.body;
    const comment = new CommentModel(data);

    try {
        await comment.save().then(() => {
            PostModel.findById(data.PostId, (err, updatePost) => {
                if (err) {
                    return res.status(200).json({ message: err, error: true });
                } else {
                    updatePost.Comment = updatePost.Comment + 1
                    updatePost.save();
                    return res.status(200).json({ message: "Publish Successfully", error: false });
                }
            });
        });
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }

}

exports.getComments = async (req, res) => {

    const postId = req.params.postId;

    try {
        CommentModel.find({ PostId: postId }, (err, result) => {
            if (err) {
                return res.status(200).json({ message: err, error: true });
            }
            return res.status(200).json({ comments: result, error: false });
        })
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }

}

exports.deleteComment = async (req, res) => {
    const data = req.body;
    try {
        await CommentModel.findByIdAndDelete(data.commentId).exec().then(() => {
            PostModel.findById(data.postId, (err, updatePost) => {
                if (err) {
                    return res.status(200).json({ message: err, error: true });
                } else {
                    updatePost.Comment = updatePost.Comment - 1
                    updatePost.save();
                    return res.status(200).json({ message: "Comment Deleted Successfully", error: false });
                }
            });
        });
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }
}