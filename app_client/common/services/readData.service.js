angular
.module('myApp')
.service('activitiesData', activitiesData)
.service('activityData', activityData)
.service('recordsData', recordsData)
.service('userData', userData);

userData.$inject = ['$http','authentication'];
function userData($http,authentication) {
    var users = function() {
        var url = '/api/users';
        return $http.get(url, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });        
    }

    return {
        users: users        
    }
}

activitiesData.$inject = ['$http'];
function activitiesData ($http) {
    return $http.get('/api/activities');
};
activityData.$inject = ['$http','authentication'];
function activityData ($http,authentication) {
    var getActivityById  = function(activityId) {
        var url = '/api/activities/' + activityId;
        return $http.get(url);
    };
    var addActivity = function(data) {
        return $http.post("/api/activity", data, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });        
    };
    var participate = function(aid) {
        return $http.put("/api/participate", {aid: aid}, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }            
        });
    }
    var myActivities = function() {
        var url ="/api/myActivities";
        return $http.get(url, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    }
    return {
        getActivityById: getActivityById,
        addActivity: addActivity,
        participate: participate,
        myActivities: myActivities
    };  
};

recordsData.$inject = ['$http','authentication'];
function recordsData ($http,authentication) {
    var records = function() {
        var url = '/api/records';
        return $http.get(url, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
    var findUserByTelephone = function(telephone) {
        var url = '/api/record/findUser';
        return $http.post(url, {telephone:telephone}, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }            
        });
    }

    var createRecord = function(data) {
        var url = 'api/record/createRecord';
        return $http.post(url, data, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    }
    return {
        records: records,
        findUserByTelephone:findUserByTelephone,
        createRecord: createRecord

    }
}