const mongoose = require('mongoose')
/*
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
*/
const articleSchema = new mongoose.Schema({
    account: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    innertext: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: () => Date.now()
    }
    /*
    slug: { 
        type: String, 
        unique: true, 
        sparse: true 
    }*/
})
/*
articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }

    next()
})
*/
module.exports = mongoose.model('Article', articleSchema)