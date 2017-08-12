(function () {
	'use strict';
	
	const stateConfig = $stateProvider => {
		$stateProvider
			.state('app.detail', {
				url: '/detail/:id',
				templateUrl: 'app/pages/detail/detail.tmpl.html',
				controller: 'DetailController as vm'
			});
	};
	
	angular.module('app.detail')
		.config(stateConfig);
})();