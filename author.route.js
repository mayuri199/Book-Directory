module.exports = (app) => {
    const authors = require('../controllers/author.controller')

    app.post('/authors', authors.create)

    app.get('/authors', authors.findAll)

    app.get('/authors/:authorId', authors.findOne)

    app.put('/authors/:authorId', authors.update)

    app.delete('/authors/:authorId', authors.delete)
}
