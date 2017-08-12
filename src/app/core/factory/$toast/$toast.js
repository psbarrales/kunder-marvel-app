/**
 * @ngdoc factory
 * @name $toast
 * @memberOf Core.Factory
 */
(function () {
	'use strict';
	
	const $toast = ($ionicLoading, $timeout) => {
		let isShowing = false;
		const show = (message, settings, cb, err) => {
			if (!isShowing) {
				isShowing = true;
				const template = `${message}`;
				const options = angular.extend({}, {
					template: template,
					icon: '',
					class: '',
					noBackdrop: true
				}, settings);
				$ionicLoading.show(options)
					.then(() => {
						if (angular.isFunction(cb)) {
							cb();
						}
						$timeout(() => {
							hide();
						}, 2500);
					})
					.catch(() => {
						if (angular.isFunction(err)) {
							err();
						}
					});
			} else {
				hide();
				show(message, settings, cb, err);
			}
		};
		
		const hide = () => {
			isShowing = false;
			$ionicLoading.hide();
		};
		
		return {
			show: show,
			hide: hide
		};
	};
	
	angular.module('$toast', [])
		.factory('$toast', $toast);
})();