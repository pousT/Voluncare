angular
.module('myApp')
.controller('myActivitiesCtrl', myActivitiesCtrl);


myActivitiesCtrl.$inject = ['activityData','$scope','$state'];
function myActivitiesCtrl(activityData,$scope,$state) {
    activityData.myActivities().success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        $scope.activities = data;
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });
    $scope.goDetail=function(activity){
        $state.go('detail',{activity:activity});  
    }
}
