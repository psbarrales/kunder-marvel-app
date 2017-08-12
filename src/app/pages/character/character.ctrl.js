(function () {
	'use strict';
	
	const CharacterController = function (
		$scope, $state, $marvel, $loading, $ionicScrollDelegate, $localStorage,
		$timeout) {
		const vm = this;
		const stateName = $state.$current.name;
		
		const obtenerDetalle = () => {
			vm.character = $localStorage.getItem('character');
			console.log(vm.character);
			$marvel.characters(vm.character)
				.then(character => {
					vm.character = _.first(character.results);
					resize();
					console.log(vm.character);
				})
				.finally(() => {
					$loading.hide();
				});
		};
		
		const obtenerImage = () => {
			if (vm.character) {
				const character = vm.character;
				let image = null;
				if (character.thumbnail) {
					image = character.thumbnail;
				} else if (character.images) {
					image = _.first(character.images);
				}
				if (image) {
					return `${image.path}.${image.extension}`;
				}
				
			}
		};
		
		const resize = () => {
			$timeout(() => {
				$ionicScrollDelegate.resize();
			});
		};
		
		vm.obtenerImage = obtenerImage;
		$scope.$on('$stateChangeSuccess', (ev, state) => {
			if (state.name === stateName) {
				$loading.show('Obteniendo detalles...');
				obtenerDetalle();
			}
		});
	};
	
	angular.module('app.detail')
		.controller('CharacterController', CharacterController);
})();
