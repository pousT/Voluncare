var app = angular.module('myApp', ['ionic','ngMessages', 'ui.router']);
    app.controller('actCtrl', function ($state, $scope, $http) {
        $scope.participate = function() {
         $http({
            url:'/participate',
            method: 'GET',
            data: {}  
        }).success(function(data,status){
            if(status == 200) {
                
            }

        }).error(function(status, data){
            console.log(data);
        })
    }
        });
