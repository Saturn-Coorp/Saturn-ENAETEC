const express = require('express')
const path =  require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()
// ==================================================
// Importing Routes
const UserRoute = require('./Routes/UserRoutes')
const UndefinedRoute = require('./Controllers/UndefinedRoute')
// ==================================================
// Dotenv variables
const PORT = process.env.PORT || 6565
const DB_KEY = process.env.DB_KEY


// Seting the tools 
const app = express()
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

// Db connection
mongoose.connect(DB_KEY)

const db = mongoose.connection

db.once('error', () => {console.log(`DataBase wasn't load!`)})
db.once('open', () => {console.log(`DataBase loaded!`)})

// Setting the EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'Pages'))

// Routes
app.use('/',UserRoute)
app.use('*',UndefinedRoute)


app.listen(PORT, () => {console.log(`Server running on PORT:${PORT}`)})