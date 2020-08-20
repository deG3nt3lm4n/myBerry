if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// Routers
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

// db
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
  useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose bitch'))

// routs
app.use('/', indexRouter)
app.use('/authors', authorRouter)

// Port info
const port = process.env.PORT || 3000
app.listen(port, () =>{
  console.log(`This bitch is on ${port} find it`)
})