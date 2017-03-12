// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('myApp', ['ionic', 'myApp.controllers', 'myApp.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('home', {
    url: '/home',
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl'
  })
  .state('myActivities', {
    url: '/myActivities',
        templateUrl: 'myActivities/myActivities.view.html',
        controller: 'myActivitiesCtrl'
  })
    .state('detail', {
    url: '/detail',
        params:{activity:null},
        templateUrl: 'activityDetail/activityDetail.view.html',
        controller: 'activityDetailCtrl'
  })
  .state('activities', {
      url: '/activities',
          templateUrl: 'activities/activities.view.html',
          controller: 'activitiesCtrl'
    })
  .state('login', {
      url: '/login',
          templateUrl: 'auth/login/login.view.html',
          controller: 'loginCtrl'
    })
    .state('postActivity', {
        url:'/postActivity',
        templateUrl: '/postActivity/postActivity.view.html',  
        controller:'postActivityCtrl'          
    })
    .state('records', {
        url:'/records',
        templateUrl: '/records/records.view.html',  
        controller:'recordsCtrl'          
    })
    .state('recharge', {
        url:'/recharge',
        templateUrl: '/recharge/recharge.view.html',  
        controller:'rechargeCtrl'          
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/activities');

});