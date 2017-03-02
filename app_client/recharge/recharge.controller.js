angular
.module('myApp')
.controller('rechargeCtrl', rechargeCtrl);


rechargeCtrl.$inject = ['rechargeData','$scope','$state'];
function rechargeCtrl(rechargeData,$scope,$state) {
    
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });
        



    $scope.methods = ["请选择充值方式", "微信转账", "支付宝转账", "银行卡转账", "现金充值"];
    $scope.amount = {text: ""}
    $scope.card = {text: ""}
    $scope.selectedMethod = {text: ""}



}

