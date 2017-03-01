angular
.module('myApp')
.controller('recordsCtrl', recordsCtrl);


recordsCtrl.$inject = ['recordsData','$scope','$state'];
function recordsCtrl(recordsData,$scope,$state) {
    recordsData.records().success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        $scope.records = data;
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });
        $scope.telephone = {text: ""};


    $scope.findUserByTelephone = function() {
        console.log($scope.telephone);
        recordsData.findUserByTelephone($scope.telephone.text).success(function(data) {
            //成功则data为查询到的用户，其中包含用户_id, telephone, name三个字段，如果电话不存在，则data为空
            if(data) {
                $scope.foundUser = data; // 如果用户存在，则储存在foundUser变量中
                console.log(data);

            } else {
                //这里处理用户不存在
                window.alert("用户不存在"); 
                console.log("用户不存在");
            }
        }).error(function (e) {
            console.log(e);
            message = "Sorry, something's gone wrong ";            
        })
    }




    




    $scope.reasons = ["公益活动", "学习成长", "其他"];
    $scope.number = {text: ""}
    $scope.selectedReason = {text: ""}

        
    $scope.adjustValue = function() {
        formData = {
                    pid: $scope.foundUser._id,
                    telephone: $scope.foundUser.telephone,
                    reason: $scope.selectedReason.text,
                    number:$scope.number.text
                };
        if($scope.foundUser){
            recordsData.createRecord(formData).success(function(data) {
             window.location.reload();
            });

        } else {
            console.log("fail");
            window.alert("用户不存在,添加失败"); 
        }



    }


}
