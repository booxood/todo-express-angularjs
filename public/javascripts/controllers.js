'use strict';

/* Controllers */

var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('todoListCtrl', function todoAddCtrl($scope, $http) {
    $http.get('/todoApi/list').success(function(data) {
        $scope.items = data;
    });

    $scope.addTodo = function(){
        $http.post('/todoApi/add', $scope.form).success(function(data){
            $scope.items = data;
            $scope.form = {};
        });
    };

});

todoControllers.controller('todoModifyCtrl', function todoFinishCtrl($scope, $http, $routeParams, $location) {
    $http.get('/todoApi/get/' + $routeParams.id).success(function(data){
        $scope.form = data;
    });

    $scope.modifyTodo = function(){
        $http.put('/todoApi/update/text/' + $routeParams.id, $scope.form).success(function(data){
            $location.url('/');
        });
    };
});

todoControllers.controller('todoDeleteCtrl', function todoDeleteCtrl($scope, $http, $routeParams, $location) {
    $http.get('/todoApi/get/' + $routeParams.id).success(function(data){
        $scope.form = data;
    });

    $scope.deleteTodo = function(){
        $http.delete('/todoApi/del/' + $routeParams.id).success(function(data){
           $location.url('/');
        });
    };

    $scope.home = function(){
        $location.url('/');
    };
});

todoControllers.controller('todoFinishCtrl', function todoFinishCtrl($scope, $http, $routeParams, $location) {
    $http.put('/todoApi/update/status/' + $routeParams.id).success(function(data){
        // $scope.items = data;
        $location.url('/');
    });
});
