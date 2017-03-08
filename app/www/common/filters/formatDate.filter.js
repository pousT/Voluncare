angular
.module('myApp')
.filter('formatDate', formatDate);

function formatDate() {
    return function (dateStr) {
        var date = new Date(dateStr);
        var d = date.getDate();
        var monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        var m = monthNames[date.getMonth()];
        var y = date.getFullYear();
        var output = y + '-' + m + '-' + d;
        return output;
    };
};