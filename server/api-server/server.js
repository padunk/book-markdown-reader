require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const books = require('./books')

const app = express()

app.use(express.static('public'))
app.use(cors())

app.use((req, res, next) => {
   const token = req.get('Authorization')

   if (token) {
      req.token = token
      next()
   } else {
      res.status(403).send({
         error: 'Please provide an Authorization header'
      })
   }
})

app.get('/books', (req, res) => {
   books.getAll(req.token)
   .then(
      data => res.send(data),
      error => {
         // tslint:disable-next-line:no-console
         console.error(error)
         res.status(500).send({
            error: 'There was an error getting books data.'
         })
      }
   )
})

app.get('/books/:id', (req, res) => {
   books.get(req.token, req.params.id)
   .then(
      data => res.send(data),
      error => {
         // tslint:disable-next-line:no-console
         console.error(error)
         res.status(500).send({
            error: 'There was an error getting book.'
         })
      }
   )
})

app.post('/books', bodyParser.json(), (req, res) => {
   books.add(req.token, req.body)
   .then(
      data => res.send(data),
      error => {
         // tslint:disable-next-line:no-console
         console.error(error)
         res.status(500).send({
            error: 'There was an errror adding new book.'
         })
      }
   )
})

app.put('/books/:id', bodyParser.json(), (req, res) => {
   books.edit(req.token, req.params.id, req.body)
   .then(
      data => res.send(data),
      error => {
         // tslint:disable-next-line:no-console
         console.error(error)
         res.status(500).send({
            error: 'There was and error edit book data.'
         })
      }
   )
})

app.delete('/books/:id', (req, res) => {
   books.disable(req.token, req.params.id)
   .then(
      data => res.send(data),
      error => {
         // tslint:disable-next-line:no-console
         console.error(error)
         res.status(500).send({
            error: 'There was an error deleting book data.'
         })
      }
   )
})

app.listen(config.port, () => {
   // tslint:disable-next-line:no-console
   console.log('Server listening on port %s, Ctrl+C to Stop', config.port)
})