(function () {
	'use strict';
	
	const ENDPOINT = 'http://gateway.marvel.com/v1/public';
	const PUBLIC_API_KEY = '80485f6c9990edae73338c39dac9b3e0';
	const TS = 'DEMO_APP_CORE';
	const HASH = '8b7b6ca0359353e3fc4d68b8aa6fcbc1';
	
	angular
		.module('core')
		.constant('ENDPOINT', ENDPOINT)
		.constant('PUBLIC_API_KEY', PUBLIC_API_KEY)
		.constant('TS', TS)
		.constant('HASH', HASH);
})();