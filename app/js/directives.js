(function (angular, undefined) {
	"use strict";
	
	var Directives = angular.module('ESPNFeedApp.directives', []);

	Directives.directive('newsTemplate', function ($http, $compile) {
		return {
			restrict: 'E',
			templateUrl: 'templates/news.html'
		};
	});

}(window.angular = window.angular || {}));