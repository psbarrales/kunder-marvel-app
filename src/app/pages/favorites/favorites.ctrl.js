(function () {
	'use strict';
	
	const FavoritesController = function (
		$scope, $state, $localStorage, $loading) {
		const vm = this;
		const stateName = $state.$current.name;
		vm.comics = [];
		let pagination = {
			offset: 0,
			limit: 10
		};
		
		const obtener = () => {
			vm.comics = _.map(
				$localStorage.getItem('favs') || [],
				comic => {
					return comic.comic;
				}
			);
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
		
		vm.obtenerImagen = obtenerImagen;
		vm.obtenerAnio = obtenerAnio;
		$scope.$on('$stateChangeSuccess', (ev, state) => {
			if (state.name === stateName) {
				obtener();
			}
		});
	};
	
	angular.module('app.favorites')
		.controller('FavoritesController', FavoritesController);
})();
