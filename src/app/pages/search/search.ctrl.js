(function () {
	'use strict';
	
	const SearchController = function (
		$scope, $state, $marvel, $loading, $timeout) {
		const vm = this;
		let tOut = null;
		vm.comics = [];
		vm.searchText = '';
		let pagination = {
			offset: 0,
			limit: 10
		};
		
		const obtener = (recargar) => {
			if (vm.searchText.length >= 3) {
				$loading.show('Buscando comics...');
				$marvel.comics(null, pagination, {
						titleStartsWith: vm.searchText
					})
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
			}
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
		
		const searchText = (newValue, oldValue) => {
			console.log(newValue, oldValue);
			if (tOut) {
				$timeout.cancel(tOut);
				tOut = null;
			}
			console.log(newValue && newValue.length >= 3);
			if (newValue && newValue.length >= 3) {
				tOut = $timeout(() => {
					obtener(true);
				}, 500);
			} else {
				vm.comics = [];
			}
		};
		
		vm.existenMas = existenMas;
		vm.obtenerImagen = obtenerImagen;
		vm.obtenerAnio = obtenerAnio;
		vm.recargar = recargar;
		vm.siguiente = siguiente;
		$scope.$watch('vm.searchText', searchText);
	};
	
	angular.module('app.search')
		.controller('SearchController', SearchController);
})();
