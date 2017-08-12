(function () {
	'use strict';
	
	const stateConfig = $stateProvider => {
		$stateProvider
			.state('app.search', {
				url: '/search',
				templateUrl: 'app/pages/search/search.tmpl.html',
				controller: 'SearchController as vm'
			});
	};
	
	angular.module('app.search')
		.config(stateConfig);
})();