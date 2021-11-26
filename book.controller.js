const Book = require('../models/book.model')
const Author = require('../models/author.model')

exports.create = (req, res) => {
    if(!req.body.title) {
        return res.status(400).send({
            message: "Book title cannot be empty!"
        })
    }

    const book = new Book({
        title: req.body.title,
        category: req.body.category,
        author: req.body.author
    })

    book.save()
    .then((data) => {
        Author.findByIdAndUpdate(req.body.author, { $push: { "books": data._id } }, { safe: true, upsert: true })
        res.send(data)
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.findAll = (req, res) => {
    Book.find()
    .then((books) => {
        res.send(books)
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.findOne = (req, res) => {
    Book.findById(req.params.bookId)
    .then((book) => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            })
        }
        res.send(book)
    })
    .catch((err) => {
        res.status(404).send({
            message: err.message
        })
    })
}

exports.update = (req, res) => {
    Book.findByIdAndUpdate(req.params.bookId, {
        title: req.body.title,
        category: req.body.category,
        author: req.body.authorId
    }, { new: true })
    .then((book) => {
        res.send(book)
    })
    .catch((err) => {
        res.status(404).send({
            message: err.message
        })
    })
}

exports.delete = (req, res) => {
    Book.findByIdAndRemove(req.params.bookId)
    .then((book) => {
        res.send({
            message: "Book deleted successfully!"
        })
    })
    .catch((err) => {
        res.status(404).send({
            message: err.message
        })
    })
}
