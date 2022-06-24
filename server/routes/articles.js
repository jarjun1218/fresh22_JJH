const express = require('express')
const router = express.Router()
const Article = require('../models/article')
const User = require('../models/user')
const Message = require('../models/message')
const Mongoose = require('mongoose')


//登入功能
router.post('/login', (req, res) => {
    if (req.session.logined) {
        // 
    } else {
        User.findOne({ email: req.body.email, password: req.body.password }).exec((err, result) => {
            if (result !== null) {
                req.session.logined = true
                req.session.account = result.email
                req.session.name = result.name
                console.log('Logined Now: ' + req.session.name)
                res.send({message: 'Succese', name: req.session.name})
            } else {
                res.send({message: 'Error'})
            }
        })
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
            res.send({ message: 'Succese'})
        } else {
            res.send({ message: 'Error' })
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
})

// 首頁
router.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdDate: 'desc'})
    res.send(articles)
})

// 瀏覽文章頁面
router.get('/more/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    const messages = await Message.find({ article_id: Mongoose.Types.ObjectId(req.params.id)})
    if (article === null) {
        res.send({ error: "This post DNE!" })
    } else {
        res.send({ article: article, messages: messages })
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
        res.send({ message: 'Succese', article: article.id })
    } catch(e) {
        console.log(e)
        res.send({ message: 'Error' })
    }
})

// 修改文章功能
router.put('/:id', async (req, res, next) => {
    let article = await Article.findById(req.params.id)
    article.account = req.session.name,
    article.title = req.body.title
    article.innertext = req.body.innertext
    try {
        article = await article.save()
        res.send({ message: 'Succese' })
    } catch(e) {
        console.log(e)
        res.send({ message: 'Error' })
    }
})

// 刪除文章功能
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
})

// 新增留言功能
router.post('/new_message/:id', async (req, res) => {
    const article = Article.findById(req.params.id)
    try {
        let message = new Message({
        account: req.session.name,
        content: req.body.message,
        article_id: Mongoose.Types.ObjectId(req.params.id)
        }).save()
    } catch(e) {
        // 
    }
})

// 編輯留言功能
router.put('/edit_message/:id', async (req, res) => {
    let message = await Message.findById(req.params.id)
    message.content = req.body.message
    try {
        message = await message.save()
    } catch(e) {
        // 
    }
})

// 刪除留言
router.delete('/delete_message/:id', async (req, res) => {
    const message = await Message.findById(req.params.id)
    const article_id = message.article_id
    await Message.findByIdAndDelete(req.params.id)
    // 
})

module.exports = router
