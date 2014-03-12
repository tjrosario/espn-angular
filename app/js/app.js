(function (angular, undefined) {
	"use strict";

	var App = angular.module('ESPNFeedApp', [
		'ESPNFeedApp.controllers',
		'ESPNFeedApp.services',
		'ESPNFeedApp.directives',
		'ngRoute'
	]);

	App.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.
			when("/", { 
				templateUrl: "partials/home.html", 
				controller: "homeController"
			}).
			when("/now", { 
				templateUrl: "partials/news/now.html", 
				controller: "nowController"
			}).
			when("/now/top", { 
				templateUrl: "partials/news/now_top.html", 
				controller: "nowTopController"
			}).
			when("/now/popular", { 
				templateUrl: "partials/news/now_popular.html", 
				controller: "nowPopularController"
			}).
			when("/mlb", { 
				templateUrl: "partials/mlb/teams.html", 
				controller: "mlbController"
			}).
			when("/mlb/:teamID", { 
				templateUrl: "partials/mlb/team.html", 
				controller: "mlbTeamController"
			}).
			otherwise({ redirectTo: '/' });
	}]);

	App.constant('apiSettings', {
		apiURL: 'http://api.espn.com',
		apiVersion: 1,
		apiKey: 'p3jta3tet2t63g9q5ak48mkv',
		apiSecret: 'TCUKdg8Fe3SVQKrYmkH7HQ27',
		limit: 5,
		offset: 0
	});	
	
}(window.angular = window.angular || {}));