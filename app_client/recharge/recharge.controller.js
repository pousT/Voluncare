angular
.module('myApp')
.controller('rechargeCtrl', rechargeCtrl);


rechargeCtrl.$inject = ['$scope','$state','rechargeData'];
function rechargeCtrl($scope,$state,rechargeData) {

    $scope.methods = ["请选择充值方式", "微信转账", "支付宝转账", "银行卡转账", "现金充值"];
    $scope.amount = {text: ""}
    $scope.card = {text: ""}
    $scope.selectedMethod = {text: ""}
    $scope.accounts = {weChat:"13586699908",
                        alipay:"13586699908",
                        bank: {
                            name:"鄞州银行",
                            detail:"咸祥支行",
                            id:"6223896813783106",
                            owner:"朱凯霞"
                        },
                        telephone:"13586699908",
                        phone:"0574-87155555"};

    $scope.adjustValue = function() {
        formData = {
                    card: $scope.card.text,
                    amount:$scope.amount.text,
                    method:$scope.selectedMethod.text
                };
            rechargeData.postRecharge(formData).success(function(data) {
            window.alert("提交成功"); 
             window.location.reload();
            });
    }
    rechargeData.myRecharges().success(function (data) {
        $scope.recharges = data;
    }).error(function (e) {
        $scope.message = "读取充值列表失败";
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
}

