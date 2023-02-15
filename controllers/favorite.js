const FavoriteModel = require('../models/Favorite');

exports.addFavorite = async (req, res) => {

    const data = req.body;
    const favorite = new FavoriteModel(data);

    try {
        await favorite.save();
        return res.status(200).json({ message: "Favoriye alma işlemi başarılı bir şekilde gerçekleşti.", error: false });
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }

}

exports.getFavorites = async (req, res) => {

    const userId = req.params.userId;

    try {
        FavoriteModel.find({ UserId: userId }, (err, result) => {
            if (err) {
                return res.status(200).json({ message: err, error: true });
            } else {
                return res.status(200).json({ favorites: result, error: false });
            }
        })
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }

}

exports.deleteFavorite = async (req, res) => {
    const favoriteId = req.params.favoriteId;
    try {
        await FavoriteModel.findByIdAndDelete(favoriteId).exec().then(() => {
            return res.status(200).json({ message: "Favorilerden silme işlemi başarılı bir şekilde gerçekleşti.", error: false });
        });
    } catch (error) {
        return res.status(200).json({ message: error, error: true });
    }
}