const mongoose = require('mongoose')

const favoritesSchema = mongoose.Schema({
    urlOfImage: String,
    date_saved: {
        type: Date,
        default: Date.now
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

})

module.exports = mongoose.model('Favorite', favoritesSchema)