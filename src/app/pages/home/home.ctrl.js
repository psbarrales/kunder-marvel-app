(function () {
	'use strict';
	
	const HomeController = function ($scope, $state, $marvel, $loading) {
		const vm = this;
		const stateName = $state.$current.name;
		vm.comics = [];
		let pagination = {
			offset: 0,
			limit: 10
		};
		
		const obtener = (recargar) => {
			$marvel.comics(null, pagination)
				.then(comics => {
					vm.meta = comics;
					if (!recargar) {
						vm.comics = vm.comics.concat(comics.results);
					} else {
						vm.comics = comics.results;
					}
				})
				.finally(() => {
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$loading.hide();
				});
		};
		
		const existenMas = () =>
			vm.meta &&
			vm.comics.length > 0 &&
			(vm.comics.length < vm.meta.total);
		
		const siguiente = () => {
			pagination.offset += pagination.limit;
			obtener();
		};
		
		const recargar = () => {
			pagination = {
				offset: 0,
				limit: 10
			};
			obtener(true);
		};
		
		const obtenerImagen = (comic) => {
			let image = null;
			if (comic.thumbnail) {
				image = comic.thumbnail;
			} else if (comic.images) {
				image = _.first(comic.images);
			}
			return `${image.path}.${image.extension}`;
		};
		
		const obtenerAnio = (comic) => {
			return (new Date(_.first(comic.dates).date)).getFullYear();
		};
		
		vm.existenMas = existenMas;
		vm.obtenerImagen = obtenerImagen;
		vm.obtenerAnio = obtenerAnio;
		vm.recargar = recargar;
		vm.siguiente = siguiente;
		$scope.$on('$stateChangeSuccess', (ev, state) => {
			if (state.name === stateName) {
				$loading.show('Obteniendo comics...');
				obtener();
			}
		});
	};
	
	angular.module('app.home')
		.controller('HomeController', HomeController);
})();
