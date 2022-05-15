if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')


mongoose.connect('mongodb://localhost/blog', () => {
  console.log("MongoDB database Connected...")
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(bodyParser.json())
/*
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
  done(null, user._id)
})

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user)
  })
})
*/
const cors = require('cors')

app.use(cors({  
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
}))

app.all('*',function (req, res, next) {
res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
res.header('Access-Control-Allow-Headers', 'Content-Type')
res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
　next()
})

const articleRouter = require('./routes/articles') 
app.use('/articles', articleRouter)

app.get('/', (req, res) => {
  res.redirect('/articles')
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`App listening on port ${port}`))