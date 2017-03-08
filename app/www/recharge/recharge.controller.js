angular
.module('myApp')
.controller('rechargeCtrl', rechargeCtrl);


rechargeCtrl.$inject = ['$scope','$state'];
function rechargeCtrl($scope,$state) {

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

