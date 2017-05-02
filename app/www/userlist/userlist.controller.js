angular
.module('myApp')
.controller('userlistCtrl', userlistCtrl);


userlistCtrl.$inject = ['$scope','$state','userData'];
function userlistCtrl($scope,$state, userData) {
    userData.users().success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        $scope.users = data;
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });   

}