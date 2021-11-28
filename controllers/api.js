const passport = require('passport')
const User = require('../models/users')
const Favorite = require('../models/favorites')
const APP_SECRET = process.env.APP_SECRET || "my_secret"
const jwt = require('jsonwebtoken');
const Poll = require('../models/poll')

module.exports = class API {
    // users
    static async loginUser(req, res, next){
        passport.authenticate('local',  function(err, user, info){
           if(err){
               res.status(404).json(err)
               res.end()
           }else{
               if(user){
                   let token = user.generateJWT()
                   res.cookie("token", token, {maxAge: 1000 * 60  * 3  * 60 *24 })
                   res.end()
               }else{
                   res.status(401).json(err)
                   res.end()
               }
           }
       })(req, res, next)
   }


   static async fetchUsers(req, res){
       try{
           const users = await User.find()
           res.status(200).json(users)
       }catch (err){
           res.status(404).json({message: err.message})
       }
   }

   static async fetchUserByID(req, res){
       const id = req.params.id
       try {
           const user = await User.findById(id)
           res.status(200).json(user)
       }catch (err){
           res.status(404).json({message: err.message})
       }
   }

   // Create a user
   static async createUser(req, res){
       let user = new User
       user.email = req.body.email
       user.username = req.body.username
       user.password = await user.setPassword(req.body.password)
       user.created = Date.now()
       try{
           await User.create(user)
           res.status(201).json({message: 'User created successfully!'})
       }catch(err){
           res.status(400).json({message: err.message})
       }
   }

   // update a user
   static async updateUser(req, res){
       const id = req.params.id
       const newUser = req.body
       try{
           await User.findByIdAndUpdate(id, newUser)
           res.status(200).json({message: 'User updated successfully'})
       } catch (err){
           res.status(404).json({message: err.message})
       }
   }

   // Delete a post
   static async deleteUser(req, res){
       const id = req.params.id
       try {
           const result = await User.findByIdAndDelete(id)
           res.status(200).json({message: 'User deleted successfully!'})
       } catch (err) {
           res.status(404).json({message: err.message})
       }
   }

   // ADD TO FAVS
   static async addToFavorites(req, res){
       let fav = new Favorite

        if(req.cookies.token){
            const user = jwt.decode(req.cookies.token, APP_SECRET)
            let id = user._id
            fav.urlOfImage = req.body.urlOfImage
            fav.user = id
            fav.date_saved = Date.now()
        }
        try{
            await Favorite.create(fav)
            res.status(201).json({message: 'Favorite added successfully!', status: 200})
        }catch(err){
            res.status(400).json({message: err.message})
        }
    }

    // Remove from favs
    static async removeFromFavorites(req, res){
        const id = req.params.id
        try {
            const result = await Favorite.findByIdAndDelete(id)
            res.status(200).json({message: 'dog removed from favorites successfully!', status: 200})
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    // get favs
    static async getFavorites(req, res){
        try{
            if(req.cookies.token){
                const user = jwt.decode(req.cookies.token, APP_SECRET)
                if(user){
                    const favs = await Favorite.find({user: user._id})
                    res.status(200).json(favs)
                }
            }
        }catch (err){
            res.status(404).json({message: err.message})
        }
    }

       // Delete a post
   static async deleteUser(req, res){
    const id = req.params.id
    try {
        const result = await User.findByIdAndDelete(id)
        res.status(200).json({message: 'User deleted successfully!'})
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}


// CREATE A POLL
static async addPoll(req, res){
    let poll = new Poll
     if(req.cookies.token){
         const user = jwt.decode(req.cookies.token, APP_SECRET)
         let id = user._id
         poll.image = req.body.image
         poll.dateOfPoll = Date.now()
         poll.love = 0,
         poll.like = 0,
         poll.dontLike = 0,
         poll.user = id
     }
     try{
         await Poll.create(poll)
         res.status(201).json({message: 'Poll added successfully', status: 200})
     }catch(err){
         res.status(400).json({message: err.message})
     }
 }

// VOTE
static async vote(req, res){
    const id = req.params.id
    const vote = req.body
    try{
        await Poll.findByIdAndUpdate(id, vote)
        res.status(200).json({message: 'Vote updated successfully'})
    } catch (err){
        res.status(404).json({message: err.message})
    }
 }

 //get polls
 static async getPolls(req, res){
    try{
        const polls = await Poll.find()
        res.status(200).json(polls)
    }catch (err){
        res.status(404).json({message: err.message})
    }
 }

  //get polls
  static async getPollByID(req, res){
      const id = req.params.id
    try{
        const poll = await Poll.findById(id)
        res.status(200).json(poll)
    }catch (err){
        res.status(404).json({message: err.message})
    }
 }

 
}