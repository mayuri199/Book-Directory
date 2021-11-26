const Author = require('../models/author.model')

exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Author name cannot be empty!"
        })
    }

    const author = new Author({
        name: req.body.name
    })

    author.save()
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.findAll = (req, res) => {
    Author.find().populate('books').exec()
    .then((authors) => {
        res.send(authors)
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.findOne = (req, res) => {
    Author.findById(req.params.authorId)
    .then((author) => {
        res.send(author)
    })
    .catch((err) => {
        res.status(404).send({
            message: err.message
        })
    })
}

exports.update = (req, res) => {
    Author.findByIdAndUpdate(req.params.authorId, {
        name: req.body.name
    })
    .then((author) => {
        res.send(author)
    })
    .catch((err) => {
        res.status(404).send({
            message: err.message
        })
    })
}

exports.delete = (req, res) => {
    Author.findByIdAndRemove(req.params.authorId)
    .then((author) => {
        res.send({
            message: "Author deleted successfully!"
        })
    })
    .catch((err) => {
        res.status(404).send({
            message: err.message
        })
    })

}
