angular
.module('myApp')
.controller('myAppCtrl', myAppCtrl);


myAppCtrl.$inject = ['$scope','$state','authentication'];
function myAppCtrl($scope,$state,authentication) {
    $scope.curUser = {};
    authentication.getUser().then(function(data) {
        if(data == undefined) {
            $scope.curUser.admin = false;   
            return;    
        } else {
            $scope.curUser = data.data;
            $scope.curUser.admin = (data.data.status > 0);
        }

    });    
}

