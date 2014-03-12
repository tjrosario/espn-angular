/*global jQuery */

(function (ESPN, $, undefined) {
	"use strict";
	
	ESPN.App = {
		init: function () {
			new ESPN.Tabs($('#news nav li'), $('#news .tab'));
		}
	};
	
	$(document).on('dom:ready', function () {
		ESPN.App.init();
	});

}(window.ESPN = window.ESPN || {}, jQuery));