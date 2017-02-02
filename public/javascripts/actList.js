var app = angular.module('myApp', ['ionic','ngMessages']);
var activities =  function ($http) {
    return $http.get('/api/activities');
};
var formdate = function() {
    return function(dateStr) {
        var date = new Date(dateStr);
        var d = date.getDate();
        var monthNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var m = monthNames[date.getMonth()];
        var y = date.getFullYear();
        var output = y + '-' + m + '-' + d;
        return output;
    };
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
app.filter('formdate', formdate);