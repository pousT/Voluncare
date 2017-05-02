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
            maxNum:'',
            image:''
        };
        $scope.returnPage = $location.search().page || '/activities';
        $scope.onSubmit = function() {
            //console.log($scope.formData);
            doAddActivity($scope.formData);
            
        };
        var doAddActivity = function (formData) {
            activityData.addActivity({                
                title: formData.title,
                description: formData.description,
                credit: formData.credit,
                price: formData.price,
                address: formData.address,
                maxNum:formData.maxNum,
                start:formData.start,
                end:formData.end,
                image:formData.image

            }).success(function(data) {
                console.log("success!");
                $location.search('page', null);
                $location.path($scope.returnPage);                
            }).error(function(err) {
                $scope.formError = "添加失败，请再试一次";
                console.log(err);
            });
            return false;
        };
                    $scope.changeDetected = false;

                    $scope.editorCreated = function (editor) {
                        console.log(editor);
                    };
                    $scope.contentChanged = function (editor, html, text) {
                        $scope.changeDetected = true;
                        console.log('editor: ', editor, 'html: ', html, 'text:', text);
                    };
                      $scope.tinymceOptions = {
    onChange: function(e) {
      // put logic here for keypress and cut/paste changes
    },
    inline: false,
    plugins : 'advlist autolink link image lists charmap print preview',
    skin: 'lightgray',
    theme : 'modern'
  };

    }


})();