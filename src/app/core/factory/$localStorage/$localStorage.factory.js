'use strict';

angular.module('$localStorage', [
		'LocalStorageModule'
	])
	.factory('$localStorage', localStorageService => {
		
		let localStorage = localStorageService;
		
		function getItem (key, defaultValue) {
			if (localStorage.get(key)) {
				return localStorage.get(key) || defaultValue;
			}
			return defaultValue || null;
		}
		
		function setItem (key, value) {
			return localStorage.set(key, value);
		}
		
		function removeItem (key) {
			return localStorage.remove(key);
		}
		
		function existItem (key) {
			return angular.isDefined(getItem(key));
		}
		
		function clear () {
			return localStorage.clearAll();
		}
		
		return {
			getItem: getItem,
			setItem: setItem,
			removeItem: removeItem,
			existItem: existItem,
			clear: clear
		};
	});