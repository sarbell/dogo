const LocalStrategy = require('passport-local').Strategy
const User = require('./models/users')
// const User = require('../models/users')
const passport = require('passport')

const strategy = new LocalStrategy(
      function(username, password, done){
         User.findOne({username: username}, function(err, user){
            if(err){
                return done(err)
            }else{
                if(!user){
                    return done(null, false, {message: "User not found"})
                }else{
                    if(!user.isValidPassword(password)){
                        return done(null, false, {message: "Incorrect password"})
                    }else{
                        return done(null, user)
                    }
                }
            }
        })
    }
)


module.exports = strategy