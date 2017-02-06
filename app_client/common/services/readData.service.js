angular
.module('myApp')
.service('activitiesData', activitiesData)
.service('activityData', activityData);

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

    return {
        getActivityById: getActivityById,
        addActivity: addActivity
    };
}