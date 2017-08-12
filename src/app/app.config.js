(function () {
	'use strict';
	
	const defaultRoute = ($locationProvider, $urlRouterProvider) => {
		$locationProvider.html5Mode(false);
		$urlRouterProvider.otherwise('/app/home');
	};
	
	const baseState = $stateProvider => {
		$stateProvider
			.state('app', {
				url: '/app',
				abstract: true,
				views: {
					'main@': {
						template: `<ion-nav-view>
							<ion-nav-bar class="bar-positive">
								<ion-nav-back-button></ion-nav-back-button>
							</ion-nav-bar>
						</ion-nav-view>`
					}
				}
				
			});
	};
	
	const manageError = $qProvider => {
		$qProvider.errorOnUnhandledRejections(false);
	};
	
	angular
		.module('core')
		.config(defaultRoute)
		.config(baseState)
		.config(manageError);
})();