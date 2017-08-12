'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const babel = require('gulp-babel');
const angularFilesort = require('gulp-angular-filesort');
const $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
const babelOptions = {
	compact: false,
	presets: ['react', 'es2015'],
	plugins: ['transform-es2015-arrow-functions']
};

gulp.task('partials', function () {
	return gulp.src([
			path.join(conf.paths.src, '/app/**/*.html'),
			path.join(conf.paths.tmp, '/serve/app/**/*.html')
		])
		.pipe($.htmlmin({
			collapseWhitespace: true,
			maxLineLength: 120,
			removeComments: true
		}))
		.pipe($.angularTemplatecache('templateCacheHtml.js', {
			module: 'core',
			root: 'app'
		}))
		.pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
	const partialsInjectFile = gulp.src(
		path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'),
		{read: false});
	const partialsInjectOptions = {
		starttag: '<!-- inject:partials -->',
		ignorePath: path.join(conf.paths.tmp, '/partials'),
		addRootSlash: false
	};
	const cssFilter = $.filter('**/*.css', {restore: true});
	const jsFilter = $.filter(['**/*.js', '**/*.jsx'], {restore: true});
	const appFilter = $.filter(['**/app.js'], {restore: true});
	const htmlFilter = $.filter('*.html', {restore: true});
	
	return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
		.pipe($.inject(partialsInjectFile, partialsInjectOptions))
		.pipe($.useref())
		.pipe(jsFilter)
		.pipe($.sourcemaps.init())
		.pipe(appFilter)
		.pipe(babel(babelOptions))
		.pipe(appFilter.restore)
		.pipe($.ngAnnotate())
		.pipe(angularFilesort())
		.on('error', conf.errorHandler('AngularFilesort'))
		.pipe($.uglify({preserveComments: $.uglifySaveLicense, mangle: false}))
		.on('error', conf.errorHandler('Uglify'))
		.pipe($.rev())
		.pipe($.sourcemaps.write('maps'))
		.pipe(jsFilter.restore)
		.pipe(cssFilter)
		.pipe($.sourcemaps.init())
		.pipe($.cleanCss())
		.pipe($.rev())
		.pipe($.sourcemaps.write('maps'))
		.pipe(cssFilter.restore)
		.pipe($.revReplace())
		.pipe(htmlFilter)
		.pipe($.htmlmin({
			collapseWhitespace: true,
			maxLineLength: 120,
			removeComments: true
		}))
		.pipe(htmlFilter.restore)
		.pipe(gulp.dest(path.join(conf.paths.dist, '/')))
		.pipe($.size({
			title: path.join(conf.paths.dist, '/'),
			showFiles: true
		}));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
	return gulp.src($.mainBowerFiles())
		.pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
		.pipe($.flatten())
		.pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function () {
	const fileFilter = $.filter(function (file) {
		return file.stat.isFile();
	});
	
	return gulp.src([
			path.join(conf.paths.src, '/**/*'),
			path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
		])
		.pipe(fileFilter)
		.pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
	return $.del(
		[path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['html', 'fonts', 'other']);