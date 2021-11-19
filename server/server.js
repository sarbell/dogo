// imports
require('dotenv').config()
// const cron = require('node-cron')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 5000

app.use(cookieParser())
// passport authentication
const strategy = require('./passport')
passport.use(strategy)
app.use(passport.initialize())

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// connection to database
mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/dog_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to the database!'))
.catch((err) => console.log(err));

// routers prefix
app.use('/api', require('./routes/routes'))

// var request = require('request');
// let image = ''
// cron.schedule("00 00 2 * * 0-6", function() {
//     console.log("should be every day at 2am?");
//     request('https://dog.ceo/api/breeds/image/random', function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(body)
//             image = body
//         }
//      })
// })

// cron.schedule("* * * * *", function() {
//     // API call goes here
// console.log("running a task every minute");
// request('https://dog.ceo/api/breeds/image/random', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body)
//         image = body
//     }
//  })
// })
// console.log(image)

// Start server
app.listen(port, () => console.log(`Server running at port ${port}`))