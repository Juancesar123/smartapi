var app = angular.module("mainApp.homepage",["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/homepagedashboard', {
            templateUrl: '/homepagedashboard',
			      controller:"homepagedashboard"
		}).otherwise({redirectTo:'/homepagedashboard'});
})

app.controller("homepagedashboard",function($timeout,$scope,$http){
  
})