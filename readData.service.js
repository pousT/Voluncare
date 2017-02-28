angular
.module('myApp')
.service('activitiesData', activitiesData)
.service('activityData', activityData)
.service('recordsData', recordsData);

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
    return {
        getActivityById: getActivityById,
        addActivity: addActivity,
        participate: participate
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

    var findUserById = function(id) {
        var url = '/api/record/findUserById';
        return $http.post(url, {id:id}, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }            
        });
    
    }
    return {
        records: records,
        findUserByTelephone:findUserByTelephone,
        findUserById:findUserById

    }
}