const mongoose = require('mongoose')
const User = mongoose.model('Users')

class UserServices {
  getUserById(userId) {
    return new Promise((resolve, reject) => {
      User.findOne({_id: userId}, (err, userData) => {
        if(err) {
          return reject(err)
        } else {
          resolve(userData)
        }
      })
    })
  }
}

module.exports = new UserServices()