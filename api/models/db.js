const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
mongoose.Promise = global.Promise

const user = mongoose.Schema({
  fullname: mongoose.Schema.Types.String,
  email: mongoose.Schema.Types.String,
  username: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
  verification_token: mongoose.Schema.Types.String,
  expire_date: mongoose.Schema.Types.Date,
  isVerified: mongoose.Schema.Types.Boolean
})

user.plugin(passportLocalMongoose, { usernameField: 'username' })

mongoose.model('Users', user)