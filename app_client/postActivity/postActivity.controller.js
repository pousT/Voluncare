(function() {
    angular.module('myApp')
        .controller('postActivityCtrl', postActivityCtrl);
    postActivityCtrl.$inject = ['$scope','$location','authentication','activityData'];
    function postActivityCtrl($scope,$location, authentication,activityData) {
        $scope.formData = {
            title: "",
            description: '',
            credit: '',
            price:'',
            address:'',
            start:'',
            end:'',
            maxNum:''
        };
        $scope.returnPage = $location.search().page || '/activities';
        $scope.onSubmit = function() {
            doAddActivity($scope.formData);
            
        };
        var doAddActivity = function (formData) {
            activityData.addActivity({                
                title: formData.title,
                description: formData.description,
                credit: formData.credit,
                price: formData.price,
                tags: formData.tags,
                address: formData.address,
                maxNum:formData.maxNum,
                start:formData.start,
                end:formData.end

            }).success(function(data) {
                console.log("success!");
                $location.search('page', null);
                $location.path($scope.returnPage);                
            }).error(function(data) {
                $scope.formError = "添加失败，请再试一次";
                console.log("error");
            });
            return false;
        };

    }
})();