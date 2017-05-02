angular
.module('myApp')
.controller('myAppCtrl', myAppCtrl);


myAppCtrl.$inject = ['$scope','$state','authentication','$location','$rootScope'];
function myAppCtrl($scope,$state,authentication,$location,$rootScope) {
    $scope.curUser = {};
    if(authentication.isLoggedIn()) {
        authentication.getUser().then(function(data) {
            if(data == undefined) {
                $location.path('/login');    
                return;    
            } else {
                $scope.curUser.data = data.data;
                $rootScope.curUser = data.data;
            }

        });        
    } else {
                $location.path('/login');           
    }  
}

