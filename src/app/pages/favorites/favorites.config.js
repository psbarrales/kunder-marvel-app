(function () {
	'use strict';
	
	const stateConfig = $stateProvider => {
		$stateProvider
			.state('app.favorites', {
				url: '/favorites',
				templateUrl: 'app/pages/favorites/favorites.tmpl.html',
				controller: 'FavoritesController as vm'
			});
	};
	
	angular.module('app.favorites')
		.config(stateConfig);
})();