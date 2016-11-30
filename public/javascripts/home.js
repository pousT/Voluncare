var app = angular.module('myApp', ['ionic','ngMessages']);
app.controller('myCtrl', function($scope, $http, $location) {
    $scope.avatar = function(){ 
        window.location = '/avatar';
    };
});