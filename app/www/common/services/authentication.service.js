(function () {
    angular
        .module('myApp')
        .service('authentication', authentication);
    
    authentication.$inject = ['$window','$http', '$rootScope'];
    function authentication($window, $http, $rootScope) {
        var base = "http://localhost:3000";
        var saveToken = function (token) {
            $window.localStorage['read-token'] = token;
        };
        var getToken = function () {
            return $window.localStorage['read-token'];
        };
        var getUser = function () {
            if (isLoggedIn()) {
            var url = base +'/api/user';
            return $http.get(url,  {
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }            
            });
        };
    }
        var register = function(user) {
            return $http.post(base+'/api/register', user).success(function(data) {
                saveToken(data.token);
                saveUser(data.user);
            });
        };
        var login = function(user) {
            return $http.post(base +'/api/login', user).success(function(data) {
                saveToken(data.token);
            });
        };
        var logout = function() {
            $window.localStorage.removeItem('read-token');
        };

        var isLoggedIn = function() {
            var token = getToken();
            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        return {
            saveToken: saveToken,
            getToken: getToken,
            register: register,
            getUser: getUser,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn
        };
    }
})();