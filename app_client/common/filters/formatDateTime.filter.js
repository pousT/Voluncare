angular
.module('myApp')
.filter('formatDateTime', formatDateTime);

function formatDateTime() {
    return function (dateStr) {
        var date = new Date(dateStr);
        var d = date.getDate();
        var monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        var hourNames = ["00","01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
        var minuteNames = ["00","01", "02", "03", "04", "05", "06", "07", "08", "09",
                            "10","11", "12", "13", "14", "15", "16", "17", "18", "19",
                            "20","21", "22", "23", "24", "25", "26", "27", "28", "29",
                            "30","31", "32", "33", "34", "35", "36", "37", "38", "39",
                            "40","41", "42", "43", "44", "45", "46", "47", "48", "49",
                            "50","51", "52", "53", "54", "55", "56", "57", "58", "59"
        ];

        var m = monthNames[date.getMonth()];
        var y = date.getFullYear();
        var h = hourNames[date.getHours()];
        var min = minuteNames[date.getMinutes()];
        var output = y + '-' + m + '-' + d + ' ' + h + ':' + min;
        return output;
    };
};