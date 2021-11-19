const mongoose = require('mongoose')

const PollSchema = mongoose.Schema({
    image: String,
    dateOfPoll: {type: Date},
    love: Number,
    like: Number,
    dontLike: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }


})

module.exports = mongoose.model('Poll', PollSchema)