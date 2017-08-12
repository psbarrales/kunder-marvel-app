(function () {
	'use strict';
	
	const stateConfig = $stateProvider => {
		$stateProvider
			.state('app.character', {
				url: '/character',
				templateUrl: 'app/pages/character/character.tmpl.html',
				controller: 'CharacterController as vm'
			});
	};
	
	angular.module('app.character')
		.config(stateConfig);
})();