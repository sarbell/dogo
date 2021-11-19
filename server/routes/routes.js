const express = require('express')
const router = express.Router()
const API = require('../controllers/api')
const User = require('../models/users')
const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET || "my_secret"



function isLoggedIn(req){
    try{
      jwt.verify(req.cookies.token, APP_SECRET)
      return true
    }catch(err){
      return false
    }
}
function requireLogIn(req, res, next){
    if(isLoggedIn(req)){
      next()
    }else{
      res.status(401)
      res.end()
    }
  }

function getCurrentUser(req){
    if(req.cookies.token){
      return jwt.decode(req.cookies.token, APP_SECRET) 
    }else {
      return null
    }
  }

// users
router.post("/user/", API.createUser)
router.post("/login/", API.loginUser)
router.get("/user/:id",  API.fetchUserByID)
router.put("/user/:id",requireLogIn, API.updateUser)
router.delete("/user/:id",requireLogIn, API.deleteUser)

// favorites
router.get("/favorites", API.getFavorites)
router.post("/favorites/add", API.addToFavorites)
router.delete("/favorites/remove/:id", API.removeFromFavorites)

//POLLS
router.get('/poll/all', API.getPolls)
router.put('/poll/vote/:id', API.vote)
router.post('/poll/add', API.addPoll)
router.get('/poll/:id', API.getPollByID)


module.exports = router;