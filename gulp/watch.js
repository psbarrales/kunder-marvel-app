'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const vars = require('./vars');

const browserSync = require('browser-sync');

function isOnlyChange (event) {
	return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {
	gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'],
		['inject-reload']);
	
	gulp.watch([
		path.join(conf.paths.src, '/app/**/*.css'),
		path.join(conf.paths.src, '/app/**/*.scss')
	], function (event) {
		if (isOnlyChange(event)) {
			gulp.start('styles-reload');
		}
		else {
			gulp.start('inject-reload');
		}
	});
	
	gulp.watch([
		path.join(conf.paths.src, '/app/**/*.js'),
		path.join(conf.paths.src, '/app/**/*.jsx')], function (event) {
		if (isOnlyChange(event)) {
			vars.filesModified = event;
			gulp.start('scripts-reload');
		}
		else {
			gulp.start('inject-reload');
		}
	});
	
	gulp.watch([
		path.join(conf.paths.src, '/app/**/*.json'),
		path.join(conf.paths.src, '/app/**/*.html')
	], function (event) {
		browserSync.reload(event.path);
	});
});