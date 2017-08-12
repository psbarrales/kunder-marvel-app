'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const vars = require('./vars');
const babel = require('gulp-babel');
const babelOptions = {
	compact: false,
	presets: ['react', 'es2015'],
	plugins: ['transform-es2015-arrow-functions']
};
const browserSync = require('browser-sync');
const $ = require('gulp-load-plugins')();

gulp.task('scripts-reload', function () {
	return buildScripts(vars.filesModified)
		.pipe(browserSync.stream());
});

gulp.task('scripts', function () {
	return buildScripts();
});

function buildScripts (file) {
	let paths = [
		path.join(conf.paths.src, '/app/**/*.module.js'),
		path.join(conf.paths.src, '/app/**/*.js'),
		path.join(conf.paths.src, '/app/**/*.jsx'),
		path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
		path.join('!' + conf.paths.src, '/app/**/*.mock.js')
	];
	if (file && file.path &&
		(file.path.indexOf('.js') > 0 || file.path.indexOf('.jsx') > 0)) {
		paths = [file.path.replace(process.cwd() + '/', '')];
	}
	return gulp.src(paths, {base: '.'})
		.pipe(babel(babelOptions))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
		.pipe($.size());
};