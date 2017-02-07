    angular
        .module('myApp')
        .service('uploadAvatar', uploadAvatar);
$scope.imgChange = function (element) {  
    if (!element.files[0]) {  
        console.log("未选择图片！");  
        return;  
    }  
    $scope.$apply(function(scope) {  
        var photofile = element.files[0];  
        var reader = new FileReader();  
        reader.onload = function(e) {  
            var prev_img = document.getElementById("face");  
            prev_img.src = e.target.result;  
            console.log(prev_img.src.length);  
            $scope.userInfo.headImage = reduceImage.compress(prev_img, 50).src;  
            console.log($scope.userInfo.headImage);  
            console.log($scope.userInfo.headImage.length);  
        };  
        reader.readAsDataURL(photofile);  
    });  
};  
  
  
var reduceImage = {  
    /** 
     * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed 
     * @param {Image} source_img_obj The source Image Object 
     * @param {Integer} quality The output quality of Image Object 
     * @return {Image} result_image_obj The compressed Image Object 
     */  
    compress: function(source_img_obj, quality, output_format){  
        var mime_type = "image/jpeg";  
        if(output_format!=undefined && output_format=="png"){  
            mime_type = "image/png";  
        }  
        var cvs = document.createElement('canvas');  
        //naturalWidth真实图片的宽度  
        //cvs.width = source_img_obj.naturalWidth;  
        //cvs.height = source_img_obj.naturalHeight;  
        var xRate = 100 / source_img_obj.naturalWidth;  
        var yRate = 100 / source_img_obj.naturalHeight;  
        cvs.width = 100;  
        cvs.height = 100;  
        var cvsContext = cvs.getContext('2d');  
        cvsContext.scale(xRate, yRate);  
        var ctx = cvsContext.drawImage(source_img_obj, 0, 0);  
        var newImageData = cvs.toDataURL(mime_type, quality/100);  
        var result_image_obj = new Image();  
        result_image_obj.src = newImageData;  
        return result_image_obj;  
    }  
};  