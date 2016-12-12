var app = angular.module('myApp', ['ionic','ngMessages', 'ui.router']);
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
