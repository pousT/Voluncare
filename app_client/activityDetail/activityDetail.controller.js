angular
.module('myApp')
.controller('activityDetailCtrl',['$scope','$stateParams','activityData',function($scope, $stateParams,activityData){
    $scope.activity = $stateParams.activity;
    activityData.getActivityById($scope.activity._id).success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        $scope.activity = data;
        console.log(data);
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });
}])