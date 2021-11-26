const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    title: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    category: String
})

module.exports = mongoose.model('Book', BookSchema)
