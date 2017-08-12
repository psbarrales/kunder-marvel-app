/**
 * @ngdoc factory
 * @name $loading
 * @memberOf Core.Factory
 */
(function () {
	'use strict';
	
	const $loading = $ionicLoading => {
		let isShowing = false;
		const show = (message, settings, cb, err) => {
			if (!isShowing) {
				isShowing = true;
				const options = angular.extend({
					icon: '',
					class: ''
				}, settings);
				const template = `<ion-spinner class="${options.class}" icon="${options.icon}"></ion-spinner><br>${message}`;
				$ionicLoading.show({
						template: template
					})
					.then(() => {
						if (angular.isFunction(cb)) {
							cb();
						}
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
	
	angular.module('$loading', [])
		.factory('$loading', $loading);
})();