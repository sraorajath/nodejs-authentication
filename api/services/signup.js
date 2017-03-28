const mongoose = require('mongoose')
const User = mongoose.model('Users')
const uuid = require('uuid')

class Signup {
  checkUsername(username) {
    return new Promise((resolve, reject) => {
      User.findOne({username: username}, (err, res) => {
        if(err) {
          return reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }

  registerUser(userData, password) {
    return new Promise((resolve, reject) => {
      userData.verification_token = uuid.v4()
      userData.expire_date = Date.now() + (24 * 60 * 60 * 1000)
      userData.isVerified = false
      delete userData.password
      User.register(new User(userData), password, (err, user) => {
        if(err) {
          return reject(err)
        } else {
          resolve(user)
        }
      })
    })
  }
}

module.exports = new Signup()