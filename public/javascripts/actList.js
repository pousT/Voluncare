var app = angular.module('myApp', ['ionic','ngMessages']);
var activities =  function ($http) {
    return $http.get('/api/activities');
};
app.service('activities', activities);
app.controller('myCtrl', function($scope, $http, $location, activities) {
        $scope.login = function(){ 
            window.location = '/login';
            
        };
    activities.success(function (data) {
        $scope.activities = data;
    });
    

});