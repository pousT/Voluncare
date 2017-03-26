angular
.module('myApp')
.controller('userSignedCtrl', userlistCtrl);


userlistCtrl.$inject = ['$scope','$state','activityData','$stateParams'];
function userlistCtrl($scope,$state, activityData,$stateParams) {
    var uids = $state.params.uids;
    activityData.signedUsers(uids).success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        $scope.users = data;
        console.log($scope.users);
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });   

}