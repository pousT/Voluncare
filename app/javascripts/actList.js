var app = angular.module('myApp', ['ionic','ngMessages', 'ui.router']);
app.controller('actListCtrl', function($scope, $http, $location, $state) {
        $scope.login = function(){ 
            window.location = '/login';
            
        };
        $http({
            url:'/actList',
            method: 'GET'   
        }).success(function(data,status){
            console.log(data);

        }).error(function(status, data){
            window.location = '/newAct';
        })
    $scope.error = "";
    $scope.detail = function(activi) {

    }

});