'use strict';

/* App Module */

var myApp = angular.module('todoApp', [
    'ngRoute',
    'todoControllers'
]);

myApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/', {
                templateUrl: 'partials/item',
                controller: 'todoListCtrl'
            }).
            when('/modify/:id', {
                templateUrl: 'partials/modify',
                controller: 'todoModifyCtrl'
            }).
            when('/delete/:id', {
                templateUrl: 'partials/delete',
                controller: 'todoDeleteCtrl'
            }).
            when('/finish/:id', {
                templateUrl: 'partials/item',
                controller: 'todoFinishCtrl'
            }).            
            otherwise({
                redirectTo: '/'
            });
}]);
