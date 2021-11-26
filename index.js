const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const dbConfig = require('./config/database.config')
const mongoose = require('mongoose')



mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Successfully connected to the database')
}).catch((err) => {
    console.log('Could not connect to database', err)
    process.exit()
})

app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to this test"
    })
})


require('./app/routes/book.routes')(app)
require('./app/routes/author.routes')(app)
app.listen(3000, () => {
    console.log("listening on port 3000")
})
