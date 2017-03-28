const mongoose = require('mongoose')
const config = require('../config.json')
mongoose.connect(config['mongodb-url'])

// function to connect or mongoDB
mongoose.connection.on('connected', function (err) {
  console.log('mongooose default connection open to' + config['mongodb-url'])
})

// if error occured while connecting to mongodb
mongoose.connection.on('error', function () {
  console.log('mangoose default connection error ' + config['mongodb-url'])
})

// if connection to the mongodb gets disconnected
mongoose.connection.on('disconnected', function () {
  console.log('mongoose default connection disconnected ' + config['mongodb-url'])
})
require('../api/models/db')