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
const User = require('./models/user')


mongoose.connect('mongodb://localhost/blog')

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
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
const articleRouter = require('./routes/articles') 
app.use('/articles', articleRouter)

app.get('/', (req, res) => {
  res.redirect('/articles')
})

app.listen(5000)