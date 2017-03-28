angular.module('myApp', ['ui.router', 'classy'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/signin',
        templateUrl: '/views/login.html.ejs',
        controller: 'loginController'
      })
      .state('user', {
        url: '/user',
        templateUrl: '/views/user.html.ejs',
        controller: 'userController'
      })
    $urlRouterProvider.otherwise('/signin')
  })

  .classy.controllers([{
    name: 'loginController',
    inject: ['$scope', '$location'],
    init: function() {
      this.$scope.msg = ''
    },
    methods: {
      login: function() {
        if(this._validate(this.$scope.username, this.$scope.password) == true) {
          var cb = generate_callback($(this));
          event.preventDefault();
          mixpanel.track("Clicked Login", { "Domain": "test.com" }, cb);
          setTimeout(cb, 500);
          this.$location.path('/user')

          function generate_callback(a) {
            return function() {
              window.location = a.attr("href");
            }
          }
        } else {
          this.$scope.msg = "Login Failed"
        }
      },
      _validate: function(username, password) {
        if(username === 'hello' && password === '111') {
          return true
        } else {
          return false
        }
      }
    }
  }, {
    name: 'userController',
    inject: ['$scope'],
    init: function() {
      this.$scope.msg = "Welcome User"
    },
    methods: {
      initValue: () => {
        console.log("Hello")
      }
    }
  }
  ])
