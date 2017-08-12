const gutil = require('gulp-util');

exports.paths = {
	src: 'src',
	dist: 'dist',
	tmp: '.tmp',
	e2e: 'e2e'
};

exports.wiredep = {
	directory: 'bower_components'
};

exports.errorHandler = function (title) {
	
	return function (err) {
		gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
		this.emit('end');
	};
};