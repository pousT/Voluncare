angular
.module('myApp')
.controller('homeCtrl', homeCtrl);

 
homeCtrl.$inject = ['authentication','$scope'];
function homeCtrl(authentication,$scope) {
    $scope.user = authentication.currentUser();
}