angular
.module('myApp')
.controller('homeCtrl', homeCtrl);

 
homeCtrl.$inject = ['activitiesData','authentication','$scope'];
function homeCtrl(activitiesData,authentication,$scope) {
    activitiesData.success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        data = data;
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });
    $scope.user = authentication.currentUser();
}