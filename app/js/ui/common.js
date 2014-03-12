/*global jQuery */

(function (ESPN, $, undefined) {

	/**
		* Creates an instance of ESPN.Tabs.
		*
		* @constructor
		* @this {ESPN.Tabs}
		* @param {object} $togglers The togglers.
		* @param {object} $tabs The tabs.
		* @param {object} opts Options.
	*/
	ESPN.Tabs = function ($togglers, $tabs, opts) {
		if ($togglers === undefined || !$($togglers.length)) { return; }
		if ($tabs === undefined || !$($tabs.length)) { return; }
		if (!this instanceof ESPN.Tabs) { return new ESPN.Tabs($togglers, $tabs, opts); }
		var _this = this; 
		
		opts = opts || {};
		_this.$togglers = $($togglers);
		_this.$tabs = $($tabs);
		
		_this.cfg = opts = {
			onBeforeOpen: (typeof opts.onBeforeOpen === 'function') ? opts.onBeforeOpen : function () {},
			onOpen: (typeof opts.onOpen === 'function') ? opts.onOpen : function () {},
			onBeforeClose: (typeof opts.onBeforeClose === 'function') ? opts.onBeforeClose : function () {},
			onClose: (typeof opts.onClose === 'function') ? opts.onClose : function () {},
			duration: (typeof opts.duration === 'number') ? opts.duration : 0,
			initial: (typeof opts.initial === 'number') ? opts.initial : 0
		};
		
		_this.current = _this.cfg.initial;
		
		_this.init();
	};
	ESPN.Tabs.prototype = {
		init: function () {
			var _this = this;
			
			_this.$togglers.each(function (idx) {
				$(this).on('click', function (ev) {
					ev.preventDefault();
					_this.goTo(idx);
				});
			});
			
			_this.goTo(_this.current);
		},
		goTo: function (idx) {
			var _this = this,
				cfg = _this.cfg;
				
			$(_this.$togglers[_this.current]).removeClass('active');
			$(_this.$togglers[idx]).addClass('active');
			
			cfg.onBeforeClose();
			$(_this.$tabs[_this.current]).fadeOut(cfg.duration, function () {
				cfg.onClose($(_this.$tabs[_this.current]));
			}).removeClass('active');
			
			cfg.onBeforeOpen();
			$(_this.$tabs[idx]).fadeIn(cfg.duration, function () {
				cfg.onOpen($(_this.$tabs[idx]));
			}).addClass('active');	
			
			_this.current = idx;
		}
	};

}(window.ESPN = window.ESPN || {}, jQuery));