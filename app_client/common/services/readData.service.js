angular
.module('myApp')
.service('activitiesData', activitiesData)
.service('activityData', activityData);

activitiesData.$inject = ['$http'];
function activitiesData ($http) {
    return $http.get('/api/activities');
};
activityData.$inject = ['$http'];
function activityData ($http) {
    var getActivityById  = function(activityId) {
        var url = '/api/activities/' + activityId;
        return $http.get(url);
    }
    return {
        getActivityById: getActivityById
    };
}