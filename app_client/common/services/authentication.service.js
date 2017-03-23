(function () {
    angular
        .module('myApp')
        .service('authentication', authentication);
    
    authentication.$inject = ['$window','$http', '$rootScope'];
    function authentication($window, $http, $rootScope) {
        var saveToken = function (token) {
            $window.localStorage['read-token'] = token;
        };
        var getToken = function () {
            return $window.localStorage['read-token'];
        };
        var getUser = function () {
            if (isLoggedIn()) {
            var url = '/api/user';
            return $http.get(url,  {
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }            
            });
        };
    }
        var register = function(user) {
            return $http.post('/api/register', user).success(function(data) {
                saveToken(data.token);
                saveUser(data.user);
            });
        };
        var login = function(user) {
            return $http.post('/api/login', user).success(function(data) {
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

        var isAdmin = function() {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return (payload.status > 0);
            } else {
                return false
            }
        };        

        return {
            saveToken: saveToken,
            getToken: getToken,
            register: register,
            getUser: getUser,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin
        };
    }
})();
