angular
.module('myApp')
.controller('homeCtrl', homeCtrl);

 
homeCtrl.$inject = ['activitiesData','userData','$scope'];
function homeCtrl(activitiesData,userData,$scope) {
    activitiesData.success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        data = data;
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });
    $scope.user = userData;
}