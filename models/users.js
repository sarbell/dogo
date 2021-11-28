const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken') 
const AUTH_TOKEN_EXPIRES_IN = 1 // days
const APP_SECRET = process.env.APP_SECRET || "my_secret"

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    created: {
        type: Date,
        default: Date.now
    },
    hash: String,
    salt: String
})

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 128, 'sha512').toString('hex')
    return this.hash
}

userSchema.methods.isValidPassword = function(password){
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 128, 'sha512').toString('hex')
    return this.hash === hash
}

userSchema.methods.generateJWT = function(){
    let expireOn = new Date()
    expireOn.setDate(expireOn.getDate() + AUTH_TOKEN_EXPIRES_IN)
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        exp: parseInt(expireOn.getTime() / 1000)
    }, APP_SECRET)
}

// module.exports = mongoose.model('User', userSchema)
const User = mongoose.model('User', userSchema)
module.exports = User