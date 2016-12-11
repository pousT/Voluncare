var app = angular.module('myApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider){
$stateProvider
.state('actList', {
    url: '/actList',
    templateUrl: 'views/actList.html',
    controller: 'actListCtrl'
})
.state('activity', {
    url: '/act/:actId',
    templateUrl: 'views/actDetail.html',
    controller: 'actCtrl'
})
})
