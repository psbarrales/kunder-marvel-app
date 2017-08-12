(function () {
	'use strict';
	
	const DetailController = function (
		$scope, $state, $marvel, $loading, $localStorage,
		$ionicScrollDelegate, $stateParams, $timeout) {
		const vm = this;
		const stateName = $state.$current.name;
		
		const obtenerDetalle = () => {
			const id = $stateParams.id;
			$marvel.comics(id)
				.then(comic => {
					vm.comic = _.first(comic.results);
					const favs = $localStorage.getItem('favs') || [];
					vm.favorite = _.findIndex(favs, {
						id: vm.comic.id
					}) >= 0;
					resize();
					console.log(vm.comic);
				})
				.finally(() => {
					$loading.hide();
				});
		};
		
		const obtenerImage = () => {
			if (vm.comic) {
				const comic = vm.comic;
				let image = null;
				if (comic.thumbnail) {
					image = comic.thumbnail;
				} else if (comic.images) {
					image = _.first(comic.images);
				}
				if (image) {
					return `${image.path}.${image.extension}`;
				}
			}
		};
		
		const obtenerLink = () => {
			if (vm.comic) {
				const url = _.find(vm.comic.urls, {type: 'purchase'});
				if (url) {
					return url.url;
				}
			}
		};
		
		const nombrePrecio = type => {
			if (type === 'printPrice') {
				return 'Versión impresa';
			} else if (type === 'digitalPurchasePrice') {
				return 'Versión digital';
			} else {
				return 'Otra';
			}
		};
		
		const verCharacter = character => {
			console.log(character);
			
			$localStorage.setItem('character', character);
			$state.go('app.character');
		};
		
		const resize = () => {
			$timeout(() => {
				$ionicScrollDelegate.resize();
			});
		};
		
		const agregarFav = () => {
			const favs = $localStorage.getItem('favs') || [];
			const fav = _.find(favs, {
				id: vm.comic.id
			});
			if (!fav) {
				favs.push({
					id: vm.comic.id,
					comic: vm.comic
				});
				$localStorage.setItem('favs', favs);
				vm.favorite = true;
			} else {
				let favorites = _.filter(favs, c => {
					return c.id !== vm.comic.id;
				});
				$localStorage.setItem('favs', favorites);
				vm.favorite = false;
			}
			
		};
		
		vm.obtenerImage = obtenerImage;
		vm.obtenerLink = obtenerLink;
		vm.nombrePrecio = nombrePrecio;
		vm.verCharacter = verCharacter;
		vm.agregarFav = agregarFav;
		$scope.$on('$stateChangeSuccess', (ev, state) => {
			if (state.name === stateName) {
				$loading.show('Obteniendo detalles...');
				obtenerDetalle();
			}
		});
	};
	
	angular.module('app.detail')
		.controller('DetailController', DetailController);
})();
