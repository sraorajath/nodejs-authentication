angular.module('myApp', ['ui.router', 'classy'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: '/views/login.html.ejs',
        controller: 'loginController'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: '/views/signup.html.ejs',
        controller: 'signupController'
      })
      .state('user', {
        url: '/user/:userId',
        templateUrl: '/views/user.html.ejs',
        controller: 'userController'
      })
    $urlRouterProvider.otherwise('/signin')
  })

  .classy.controllers([{
    name: 'loginController',
    inject: ['$scope', '$location', '$http'],
    init: function() {
      this.$scope.empty = ''
      this.$scope.err = ''
    },
    methods: {
      login: function() {
        if(this._validate(this.$scope.username, this.$scope.password) == true) {
          const userDetails = {
            username: this.$scope.username,
            password: this.$scope.password
          }
          this.$http.post('http://52.36.8.85:8080/v1/api/signin', userDetails)
            .then((res) => {
              if(res.data.message == 'success') {
                this.$location.path('/user/' + res.data.data._id)
              } else {
                // this.$scope.err = 'Login Failed'
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.$scope.empty = 'Username and Password Required'
        }
      },
      _validate: function(username, password) {
        if(username !== undefined && password !== undefined) {
          return true
        } else {
          return false
        }
      },
      goToSignup: function() {
        this.$location.path('/signup')
      }
    }
  }, {
    name: 'signupController',
    inject: ['$scope', '$http', '$location'],
    init: function() {
    },
    methods: {
      signup: function() {
        const data = {
          fullname: this.$scope.fullname,
          email: this.$scope.email,
          username: this.$scope.username,
          password: this.$scope.password
        }
        if(this._validate(data) == true && this._validatePassword(data) == true) {
          this.$http.post('http://52.36.8.85:8080/v1/api/signup', data)
            .then((res) => {
              if(res.data.message == 'success') {
                this.$location.path('/user/' + res.data.data._id)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          console.log("Error")
        }
      },
      _validate: function(data) {
        if(data.fullname !== undefined && data.email !== undefined && data.username !== undefined && data.password !== undefined) {
          return true
        } else {
          return false
        }
      },
      _validatePassword: function(data) {
        if(data.password === this.$scope.cpassword) {
          return true
        } else {
          return false
        }
      }
    }
  }, {
    name: 'userController',
    inject: ['$scope', '$http', '$stateParams'],
    init: function() {
      this.$scope.msg = ' '
      this.$scope.userId = this.$stateParams.userId
    },
    methods: {
      getUserData: function() {
        this.$http.get('http://52.36.8.85:8080/v1/api/getUserById/' + this.$scope.userId)
          .then((res) => {
            if(res.data.message == 'success') {
              this.$scope.msg = 'Welcome ' + res.data.data.fullname
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      logout: function () {
        this.$http.get('http://52.36.8.85:8080/v1/api/signout')
          .then(function(res) {
            if(res.data.message == 'Logout success') {
              this.$location.path('/signin')
            }
          })
          .catch(function(err) {
            console.log(err)
          })
      }
    }
  }
  ])
