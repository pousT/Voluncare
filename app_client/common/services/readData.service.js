angular
.module('myApp')
.service('activitiesData', activitiesData)
.service('activityData', activityData)
.service('recordsData', recordsData)
.service('userData', userData)
.service('rechargeData', rechargeData);

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
        var fd = new FormData();
        for(var key in data)
            fd.append(key, data[key]);        
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
    var signedUsers = function(ids) {
        var url ="/api/activity/signedUser";
        return $http.put(url, {uids:ids},{
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    }
    return {
        getActivityById: getActivityById,
        addActivity: addActivity,
        participate: participate,
        myActivities: myActivities,
        signedUsers:signedUsers
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

rechargeData.$inject = ['$http','authentication'];
function rechargeData ($http,authentication) {
    var recharges = function() {
        var url = '/api/recharges';
        return $http.get(url, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
    var pass = function(rid) {
        return $http.put("/api/recharge/pass", {rid: rid}, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }            
        });
    }
    var reject = function(rid) {
        return $http.put("/api/recharge/reject", {rid: rid}, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }            
        });
    }
    var postRecharge = function(data) {
        var url = 'api/recharge';
        return $http.post(url, data, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    }
    var myRecharges = function(data) {
        var url = 'api/myRecharges';
        return $http.get(url, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });        
    }
    return {
        recharges: recharges,
        pass:pass,
        reject:reject,
        postRecharge:postRecharge,
        myRecharges: myRecharges
    }
}