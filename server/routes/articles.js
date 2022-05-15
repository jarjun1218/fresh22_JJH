const express = require('express')
const router = express.Router()
const Article = require('../models/article')
const User = require('../models/user')
const Message = require('../models/message')
const Mongoose = require('mongoose')


//登入頁面
router.get('/login', (req, res) => {
    if (req.session.logined) {
        res.redirect('/articles')
    } else {        
        res.render('login')
    }
})

//登入功能
router.post('/login', (req, res) => {
    if (req.session.logined) {
        res.redirect('/articles')
    } else {
        User.findOne({ email: req.body.email, password: req.body.password }).exec((err, result) => {
            if (result !== null) {
                req.session.logined = true
                req.session.account = result.email
                req.session.name = result.name
                console.log('Logined Now: ' + result.name)
                res.redirect('/articles')
            } else {
                res.redirect('/articles/login')
            }
        })
    }
})

// 註冊頁面
router.get('/register', (req, res) => {
    if (req.session.logined) {
        res.redirect('/articles')
    } else {
        res.render('register')
    }
})

// 註冊功能
router.post('/register', (req, res) => {
    if (req.session.logined) {
        res.redirect('/articles')
    } else {
    User.findOne({ email: req.body.email }).exec((err, result) => {
        if (result === null) {
            let user = new User({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
            }).save()
        req.session.logined = true
        req.session.account = req.body.email
        req.session.name = req.body.name
        console.log('Logined Now: ' + req.body.name)
        res.redirect('/articles')
        } else {
            res.redirect('/articles/register')
        }
    })
    } 
})


// 修改密碼頁面
router.get('/edit_user/:name', async (req,res) => {
    if (req.session.logined) {
        const user = await User.findOne({ name: req.session.name })
        res.render('edit_user', { user: user })
    } else {
        res.redirect('/articles/login')
    }
})

//修改密碼功能
router.put('/edit_user/:name', async (req,res) => { 
    if (req.session.logined) {
        let user = await User.findOne({ name: req.session.name })
        if (req.body.password === req.body.confirm_password) {
            user.password = req.body.password
            user = await user.save()
            res.redirect('/articles')
        } else {
            res.render('edit_user', { user: user })
        }
    } else {
        res.redirect('/articles/login')
    }
})

// 登出功能
router.delete('/logout', (req,res) => {
    console.log(`${req.session.name} has logged out`)
    req.session.destroy()
    res.redirect('/articles')
})

// 首頁
router.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdDate: 'desc'})
    res.render('homepage', { articles: articles, req: req })
})

// 瀏覽文章頁面
router.get('/more/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    const messages = await Message.find({ article_id: Mongoose.Types.ObjectId(req.params.id)})
    if (article === null) {
        res.redirect('/articles')
    } else {
        res.render('show', { article: article, messages: messages, req: req })
    }
})

// 新增文章頁面
router.get('/new', (req, res) => {
    if (req.session.logined) {
        res.render('new', { article: new Article() })
    } else {
        res.redirect('/articles/login')
    }
})

// 新增文章功能
router.post('/new', async (req, res, next) => {
    let article = new Article({
        account: req.session.name,
        title: req.body.title,
        innertext: req.body.innertext
    })
    try {
        article = await article.save()
        res.redirect(`/articles/more/${article.id}`)
    } catch(e) {
        console.log(e)
        res.render('new', { article: article })
    }
})

// 修改文章頁面
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('edit', { article: article })
})

// 修改文章功能
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

// 刪除文章功能
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/articles')
})

/*
// 新增留言頁面
router.get('/:id/new_message', async (req, res) => {
    const article = await Article.find({ slug: req.params.slug })
    res.render('newmessage', { article: article, message: new Message() })
})
*/

// 新增留言功能
router.post('/new_message/:id', async (req, res) => {
    const article = Article.findById(req.params.id)
    try {
        let message = new Message({
        account: req.session.name,
        content: req.body.message,
        article_id: Mongoose.Types.ObjectId(req.params.id)
        }).save()
        res.redirect(`/articles/more/${req.params.id}`)
    } catch(e) {
        res.render('show', { article: article })
    }
})

// 編輯留言介面
router.get('/edit_message/:id', async (req, res) => {
    const message = await Message.findById(req.params.id)
    res.render('edit_message', { message: message })
})

// 編輯留言功能
router.put('/edit_message/:id', async (req, res) => {
    let message = await Message.findById(req.params.id)
    message.content = req.body.message
    try {
        message = await message.save()
        res.redirect(`/articles/more/${message.article_id}`)
    } catch(e) {
        res.render('edit_message', { message: message })
    }
})

// 刪除留言
router.delete('/delete_message/:id', async (req, res) => {
    const message = await Message.findById(req.params.id)
    const article_id = message.article_id
    await Message.findByIdAndDelete(req.params.id)
    res.redirect(`/articles/more/${article_id}`)
})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.account = req.session.name
        article.title = req.body.title
        article.innertext =  req.body.innertext
        try {
            article = await article.save()
            res.redirect(`/articles/more/${article.id}`)
        } catch (e) {
            res.render(`${path}`, { article: article })
        }
    }
}
/*
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
*/

module.exports = router

/*
passport.use(new LocalStrategy({usernameField: 'email'},
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      User.comparePassword(password, user.password, function(err, result){
        if(err) throw err
        if(result) {
          return done(null, user)
        } else {
          return done(null, false, {message: 'Invalid password'})
        }
      })
    })
  }
))
*/
