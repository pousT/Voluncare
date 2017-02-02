var app = angular.module('myApp', ['ionic','ngMessages', 'ui.router']);
var activity =  function ($http) {
    return $http.get('/api/activity');
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
    app.controller('actCtrl', function ($state, $scope, $http) {
        $scope.signed = false;
        $scope.participate = function() {
         $http({
            url:'/participate',
            method: 'GET',
            data: {}  
        }).success(function(data,status){

                $scope.signed = true;


        }).error(function(status, data){
            console.log(data);
        })
    }
        });
