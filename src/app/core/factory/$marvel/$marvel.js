(function () {
	'use strict';
	
	const MarvelFactory = (ENDPOINT, HASH, PUBLIC_API_KEY, $q, $http) => {
		
		const request = (u, params = {}) => {
			const defer = $q.defer();
			const url = u.replace(ENDPOINT, '');
			$http({
				method: 'GET',
				url: `${ENDPOINT}${url}`,
				params: angular.extend({}, params,
					{hash: HASH, apikey: PUBLIC_API_KEY})
			})
				.then(res => {
					defer.resolve(res.data.data);
				})
				.catch(err => {
					defer.reject(err);
				});
			return defer.promise;
		};
		
		const comics = (id, pagination = {
			offset: 0,
			limit: 20
		}, filter = {}) => {
			console.log(id, pagination);
			const defer = $q.defer();
			if (!id) {
				request(
					'/comics',
					angular.extend({}, pagination,
						angular.extend({}, {orderBy: 'title'}, filter)))
					.then(res => {
						defer.resolve(res);
					})
					.catch(err => {
						defer.reject(err);
					});
			} else {
				request(`/comics/${id}`, {orderBy: 'title'})
					.then(res => {
						defer.resolve(res);
					})
					.catch(err => {
						defer.reject(err);
					});
			}
			return defer.promise;
		};
		
		const characters = (character, pagination = {
			offset: 0,
			limit: 20
		}) => {
			const defer = $q.defer();
			console.log(character);
			if (!character) {
				request(
					'/characters',
					angular.extend({}, pagination, {orderBy: 'name'}))
					.then(res => {
						defer.resolve(res);
					})
					.catch(err => {
						defer.reject(err);
					});
			} else {
				request(
					character.resourceURI,
					angular.extend({}, pagination, {orderBy: 'name'}))
					.then(res => {
						defer.resolve(res);
					})
					.catch(err => {
						defer.reject(err);
					});
			}
			return defer.promise;
		};
		
		return {
			comics: comics,
			characters: characters
		};
	};
	
	angular.module('$marvel', [])
		.factory('$marvel', MarvelFactory);
})();