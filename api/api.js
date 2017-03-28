const express = require('express')
const passport = require('passport')
const SignUp = require('./services/signup')
const UserServices = require('./services/user')
const app = express.Router()

// Check Session Exists or not
const CheckAuth = (req, res, next) => {
  if(!req.user) {
    next(res.send({
      status: 403,
      message: 'Unauthorized'
    }))
  } else {
    next()
  }
}

// Signin API
app.post('/signin', (req, res, next) => {
  if(!req.user) {
    passport.authenticate('local', (err, user, info) => {
      if(err) {
        return next(err)
      }
      if(!user) {
        return res.send(info)
      }
      req.login(user, (err) => {
        if(err) {
        res.send({
          status: 403,
          message: 'error',
          error: err
        })
        }
        res.send({
          status: 200,
          message: 'success',
          data: user
        })
      })
    })(req, res, next)
  } else {
    console.log(req.user)
    res.send({
      status: 403,
      message: 'Already Loggedin'
    })
  }
})

// Signout API
app.get('/signout', CheckAuth, (req, res) => {
  req.logout()
  res.send({
    status: 200,
    message: 'Logout success'
  })
})

// Signup API
app.post('/signup', (req, res) => {
  const password = req.body.password
  SignUp.registerUser(req.body, password)
    .then((result) => {
      new Promise((resolve, reject) => {
        req.logIn(result, err => {
          if(err) {
            return reject(err.message)
          } else {
            resolve()
          }
        })
      }).then(() => {
        res.send({
          status: 200,
          message: 'success',
          data: result
        })
      })
    }).catch((err) => {
      res.send({
        status: 401,
        message: 'error',
        error: err
      })
    })
})

// Get User Detsilas By Id
app.get('/getUserById/:userId', CheckAuth, (req, res) => {
  UserServices.getUserById(req.params.userId)
    .then((userDetails) => {
      res.send({
        status: 200,
        message: 'success',
        data: userDetails
      })
    }).catch((err) => {
      res.send({
        status: 500,
        message: 'error',
        error: err
      })
    })
})

module.exports = app