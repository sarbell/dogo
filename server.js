// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const history = require('connect-history-api-fallback');


const path = require("path")


const app = express()
const port = process.env.PORT || 5000

app.use(history());
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

app.use(express.static(path.join(__dirname, "./dist")))
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})


// Start server
app.listen(port, () => console.log(`Server running at port ${port}`))