angular
.module('myApp')
.controller('rechargeAdminCtrl', rechargeAdminCtrl);


rechargeAdminCtrl.$inject = ['rechargeData','$scope','$state','$ionicModal'];
function rechargeAdminCtrl(rechargeData,$scope,$state, $ionicModal) {
    rechargeData.recharges().success(function (data) {
        $scope.recharges = data;
    }).error(function (e) {
        $scope.message = e.message;
    });
        $scope.telephone = {text: ""};


    $scope.findUserByTelephone = function() {
        rechargeData.findUserByTelephone($scope.telephone.text).success(function(data) {
            //成功则data为查询到的用户，其中包含用户_id, telephone, name三个字段，如果电话不存在，则data为空
            if(data) {
                $scope.foundUser = data; // 如果用户存在，则储存在foundUser变量中

            } else {
                //这里处理用户不存在
                window.alert("用户不存在"); 
                console.log("用户不存在");
            }
        }).error(function (e) {
            console.log(e);
            $scope.message = e.message;            
        })
    }
    $scope.curRecharge = {};
    $scope.curRecharge.id = '';
    $scope.openDetail = function(recharge) {
      $scope.curRecharge = recharge;
      $scope.modal.show();
    }

    $scope.pass = function(rid) {
        rechargeData.pass(rid).success(function(data) {
            $scope.message = "已通过";
            $scope.modal.hide();
        }).error(function(e) {

        });
    }
    $scope.reject = function(rid) {
        rechargeData.reject(rid).success(function(data) {
            $scope.message = "已拒绝";
            $scope.modal.hide();
            rechargeData.recharges().success(function (data) {
                $scope.recharges = data;
            }).error(function (e) {
                $scope.message = "读取充值列表失败";
            });
                }).error(function(e) {

                });
            }
    $scope.number = {text: ""}
    $scope.selectedReason = {text: ""}

          // .fromTemplateUrl() 方法
          $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modal = modal;
          });

    $scope.showFlag = function (flag){
      if (flag == 0) {
        return "未处理";
      } else if (flag == 1) {
        return "已通过";
      } else {
        return "已拒绝";
      }
    }
    $scope.hasProcessed = function(flag) {
      return flag != 0;
    }
}