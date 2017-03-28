const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('cookie-session')
const app = express()
require('./config.json')
require('./config/db')
const api = require('./api/api')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'js')))
app.use(express.static(path.join(__dirname, 'css')))
app.use('/views', express.static(path.join(__dirname, 'views')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({keys: ['i32ew9d8osih23rgufewi7dc3h2bewdi78oihqwdbig8deowi']}))

// Configure Passport
app.use(passport.initialize())
app.use(passport.session())

const User = mongoose.model('Users')
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// CSS
app.use('/bootstrap.css', express.static(path.join(__dirname, '/bower_components/bootstrap/dist/css/bootstrap.min.css')))
app.use('/bootstrap-theme.css', express.static(path.join(__dirname, '/bower_components/bootstrap/dist/css/bootstrap-theme.min.css')))

// JS
app.use('/angular.js', express.static(path.join(__dirname, 'bower_components/angular/angular.min.js')))
app.use('/angular-ui-router.js', express.static(path.join(__dirname, 'bower_components/angular-ui-router/release/angular-ui-router.min.js')))
app.use('/bootstrap.js', express.static(path.join(__dirname, '/bower_components/bootstrap/dist/js/bootstrap.min.js')))
app.use('/jquery.js', express.static(path.join(__dirname, '/bower_components/jquery/dist/jquery.min.js')))
app.use('/angular-classy.js', express.static(path.join(__dirname, '/bower_components/angular-classy/angular-classy.min.js')))

app.use('/v1/api/', api)

app.get('/', function(req, res) {
    res.render('index.html.ejs')
})

app.listen(8080)

module.exports = app
