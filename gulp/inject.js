'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const $ = require('gulp-load-plugins')();
const wiredep = require('wiredep').stream;
const _ = require('lodash');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const babelOptions = {
	compact: false,
	presets: ['react', 'es2015'],
	plugins: ['transform-es2015-arrow-functions']
};

gulp.task('inject-reload', ['inject'], function () {
	browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function () {
	const injectStyles = gulp.src([
		path.join(conf.paths.tmp, '/serve/app/**/*.css'),
		path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
	], {read: false});
	const injectScripts = gulp.src([
			path.join(conf.paths.src, '/serve/app/**/*.module.js'),
			path.join(conf.paths.tmp, '/serve/app/**/*.js'),
			path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
			path.join('!' + conf.paths.src, '/app/**/*.mock.js')
		])
		.pipe(babel(babelOptions))
		.pipe($.angularFilesort())
		.on('error', conf.errorHandler('AngularFilesort'));
	const injectOptions = {
		ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
		addRootSlash: false
	};
	
	return gulp.src(path.join(conf.paths.src, '/*.html'))
		.pipe($.inject(injectStyles, injectOptions))
		.pipe($.inject(injectScripts, injectOptions))
		.pipe(wiredep(_.extend({}, conf.wiredep)))
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});