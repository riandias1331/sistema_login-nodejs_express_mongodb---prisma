require('dotenv').config()
const express = require('express')
const app = express()
const port = 3333 || process.env.PORT

const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const session = require('express-session') 
const MongoStore = require('connect-mongo')
const flash = require('connect-flash') 

const sessionOptions = session({
    secret: 'askodjiyfdygdlm', 
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }), 
    resave: false, 
    saveUninitialized: true, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, 
        httpOnly: true 
    }
})

app.use(sessionOptions) // aplica as opções de sessão configuradas
app.use(flash()) // ativa o uso de flash messages

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Database Connected')
        app.emit('DataBase')
    })
    .catch(() => console.log('Database is not Connected'))

const routes = require('./routes')
app.use(routes)

app.engine('html', require('ejs').renderFile) // Configura o servidor para renderizar HTML com o motor EJS
app.set('view engine', 'html') // Define o motor de renderização de HTML
app.set('views', path.join(__dirname, 'src', 'views')) // Define o diretório de views

app.on('DataBase', () => {
    app.listen(port, () => {
        console.log('Serving is Running')
        console.log('http://localhost:3333')
    })
})

