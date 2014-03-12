(function (espn, angular, $, undefined) {
	"use strict";

	var Controllers = angular.module('ESPNFeedApp.controllers', []),
		$doc = $(document);

	Controllers.controller('homeController', function ($scope, $http, $q, $timeout, espnAPIService) {
		$scope.newsTabs = [];

		$scope.getFeeds = function () {
			$q.all([
				espnAPIService.getNow(),
				espnAPIService.getNowTop(),
				espnAPIService.getNowPopular()
			]).then(function (results) {
				var aggregatedData = [];
				angular.forEach(results, function (result) {
					$scope.newsTabs.push(result);
				});
				
				$timeout(function () {
					$doc.trigger('dom:ready');
				}, 100);
			});
		};
		
		$scope.getFeeds();
	});
	
	Controllers.controller('nowController', function ($scope, espnAPIService, apiSettings) {
		$scope.feed = [];
		$scope.limit = apiSettings.limit;
		$scope.offset = 0;
		$scope.more = true;
		
		$scope.getFeed = function () {
			var opts = {
				offset: $scope.offset,
				limit: $scope.limit
			};
			espnAPIService.getNow(opts).then(function (resp) {
				$scope.more = resp.feed.length === $scope.limit;
				$scope.feed = $scope.feed.concat(resp.feed);
			});
		};
		
		$scope.showMore = function () {
			$scope.offset += $scope.limit;
			$scope.getFeed();
		};
		
		$scope.hasMore = function () {
			return $scope.more;
		};
		
		$scope.getFeed();

	});

	Controllers.controller('nowTopController', function ($scope, espnAPIService) {
		$scope.feed = [];
		
		espnAPIService.getNowTop().then(function (resp) {
			$scope.feed = resp.feed;
		});

	});

	Controllers.controller('nowPopularController', function ($scope, espnAPIService) {
		$scope.feed = [];
		
		espnAPIService.getNowPopular().then(function (resp) {
			$scope.feed = resp.feed;
		});
	});
	
	Controllers.controller('mlbController', function ($scope, espnAPIService) {
		$scope.teams = [];
		
		espnAPIService.getTeams('baseball', 'mlb').then(function (resp) {
			$scope.teams = resp.sports[0].leagues[0].teams;
		});
	});
	
	Controllers.controller('mlbTeamController', function ($scope, $routeParams, espnAPIService) {
		$scope.teams = [];
		$scope.teamID = $routeParams.teamID;
		
		espnAPIService.getTeam('baseball', 'mlb', $scope.teamID).then(function (resp) {
			$scope.team = resp.sports[0].leagues[0].teams[0];
		});
	});
		
}(window.ESPN = window.ESPN || {}, window.angular = window.angular || {}, jQuery));