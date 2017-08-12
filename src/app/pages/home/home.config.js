(function () {
	'use strict';
	
	const stateConfig = $stateProvider => {
		$stateProvider
			.state('app.home', {
				url: '/home',
				templateUrl: 'app/pages/home/home.tmpl.html',
				controller: 'HomeController as vm'
			});
	};
	
	angular.module('app.home')
		.config(stateConfig);
})();