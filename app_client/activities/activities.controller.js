angular
.module('myApp')
.controller('activitiesCtrl', activitiesCtrl);


activitiesCtrl.$inject = ['activitiesData','$scope','$state','authentication'];
function activitiesCtrl(activitiesData,$scope,$state,authentication) {
    activitiesData.success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        $scope.activities = data;
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });
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
    $scope.goDetail=function(activity){
        console.log($scope.curUser);
        $state.go('detail',{activity:activity, user:$scope.curUser});  
    }
}

