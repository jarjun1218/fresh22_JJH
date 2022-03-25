const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema ({
    date: {
        type: Date,
        default: () => Date.now()
    },
    account: { 
        type: String
    },
    content:{
        type: String
    }, 
    article_id: {
        type: String
    }
})

module.exports = mongoose.model( 'Message', messageSchema ) 