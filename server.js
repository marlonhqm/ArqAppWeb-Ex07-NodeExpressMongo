const express = require('express')
const mongoose = require('mongoose') 
const candidatoRouter = require('./resources/Candidato')


require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
const db = mongoose.connection

app.use(express.json())

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to MongoDB'))

app.use('/v1/candidatos', candidatoRouter)


app.listen(3000, function () {
  console.log('Server is running port 3000')
})