(function (angular, undefined) {
	"use strict";
	//http://developer.espn.com/docs
	var Services = angular.module('ESPNFeedApp.services', []);
	
	Services.factory('utils', function () {
		var _buildParams = function (prefix, obj, add) {
			var name, i, l, rbracket;
			rbracket = /\[\]$/;
			if (obj instanceof Array) {
				for (i = 0, l = obj.length; i < l; i++) {
					if (rbracket.test(prefix)) {
						add(prefix, obj[i]);
					} else {
						_buildParams(prefix + "[" + ( typeof obj[i] === "object" ? i : "" ) + "]", obj[i], add);
					}
				}
			} else if (typeof obj == "object") {
				// Serialize object item.
				for (name in obj) {
					_buildParams(prefix + "[" + name + "]", obj[ name ], add);
				}
			} else {
				// Serialize scalar item.
				add(prefix, obj);
			}
		};
	
		return {
			toQueryString: function (a) {
				var prefix, s, add, name, r20, output;
				s = [];
				r20 = /%20/g;
				add = function (key, value) {
					// If value is a function, invoke it and return its value
					value = ( typeof value == 'function' ) ? value() : ( value == null ? "" : value );
					s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
				};
				if (a instanceof Array) {
					for (name in a) {
						add(name, a[name]);
					}
				} else {
					for (prefix in a) {
						_buildParams(prefix, a[ prefix ], add);
					}
				}
				output = s.join("&").replace(r20, "+");
				return output;
			}
		};
	});
	
	Services.factory('espnAPIService', function (apiSettings, $http, $q, utils) {
		var espnAPI = {};
		
		espnAPI.getNow = function (opts) {
			opts = opts || {};
			opts.limit = opts.limit || apiSettings.limit;
			opts.offset = opts.offset || apiSettings.offset;
			
			var deferred = $q.defer(),
				params = utils.toQueryString(opts);
				
			$http({
				method: 'GET',
				url: apiSettings.apiURL + '/v' + apiSettings.apiVersion + '/now?apikey=' + apiSettings.apiKey + '&' + params
			}).success(function (resp) {
				resp.feed.tabName = 'Now';
				deferred.resolve(resp);
			}).error(function (resp) {
				deferred.reject(resp);
			});
			
			return deferred.promise;
		};
		
		espnAPI.getNowTop = function (opts) {
			opts = opts || {};
			opts.limit = opts.limit || apiSettings.limit;
			opts.offset = opts.offset || apiSettings.offset;
			var deferred = $q.defer(),
				params = utils.toQueryString(opts);
			
			$http({
				method: 'GET',
				url: apiSettings.apiURL + '/v' + apiSettings.apiVersion + '/now/top?apikey=' + apiSettings.apiKey + '&' + params
			}).success(function (resp) {
				resp.feed.tabName = 'Top';
				deferred.resolve(resp);
			}).error(function (resp) {
				deferred.reject(resp);
			});
			
			return deferred.promise;
		};
		
		espnAPI.getNowPopular = function (opts) {
			opts = opts || {};
			opts.limit = opts.limit || apiSettings.limit;
			opts.offset = opts.offset || apiSettings.offset;
			var deferred = $q.defer(),
				params = utils.toQueryString(opts);
			
			$http({
				method: 'GET',
				url: apiSettings.apiURL + '/v' + apiSettings.apiVersion + '/now/popular?apikey=' + apiSettings.apiKey + '&' + params
			}).success(function (resp) {
				resp.feed.tabName = 'Popular';
				deferred.resolve(resp);
			}).error(function (resp) {
				deferred.reject(resp);
			});
			
			return deferred.promise;
		};
		
		espnAPI.getTeams = function (sport, league, opts) {
			opts = opts || {};
			var deferred = $q.defer();
			
			$http({
				method: 'GET',
				url: apiSettings.apiURL + '/v' + apiSettings.apiVersion + '/sports/' + sport + '/' + league + '/teams?apikey=' + apiSettings.apiKey
			}).success(function (resp) {
				deferred.resolve(resp);
			}).error(function (resp) {
				deferred.reject(resp);
			});
			
			return deferred.promise;
		};
		
		espnAPI.getTeam = function (sport, league, teamID, opts) {
			opts = opts || {};
			var enable = 'venues, statistics, ranks, roster, leaders',
				deferred = $q.defer();
			$http({
				method: 'GET',
				url: apiSettings.apiURL + '/v' + apiSettings.apiVersion + '/sports/' + sport + '/' + league + '/teams/' + teamID + '?enable=' + enable + '&apikey=' + apiSettings.apiKey
			}).success(function (resp) {
				deferred.resolve(resp);
			}).error(function (resp) {
				deferred.reject(resp);
			});
			
			return deferred.promise;
		};

		return espnAPI;
	});
	
}(window.angular = window.angular || {}));