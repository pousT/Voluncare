var app = angular.module('myApp', ['ionic','ngMessages', 'ui.router']);
    app.controller('actCtrl', function ($state, $scope, $stateParams) {
        $scope.activity = $state.params.object
        console.log(JSON.parse($state.params.object));


    })