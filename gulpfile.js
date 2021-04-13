const {
	src, dest, watch, parallel, task, series,
} = require('gulp');
const browserSync = require('browser-sync');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const cssDir = 'dist/css';

const files = {
	index: ['index.html'],
	hbs: ['src/hbs/**/*.hbs', '!src/hbs/partials/*.hbs'],
	partials: ['src/hbs/partials/*.hbs'],
	js: ['dist/js/**/*'],
	allScss: ['src/scss/**/*'],
	scss: ['src/scss/*.scss'],
};

function errorHandler(err) {
	console.log(err); // eslint-disable-line
	this.emit('end');
}

const indexFile = () => src(files.index)
	.pipe(browserSync.stream());

const hbsFiles = () => src(files.hbs)
	.pipe(handlebars({}, { batch: ['src/hbs/partials'] }))
	.pipe(rename({ extname: '.html' }))
	.pipe(dest('docs'))
	.pipe(browserSync.stream());

const jsFiles = () => src(files.js)
	.pipe(browserSync.stream());

const scssFiles = () => src(files.scss)
	.pipe(sourcemaps.init())
	.pipe(sass({ outputStyle: 'expanded' }).on('error', errorHandler))
	.pipe(autoprefixer())
	.pipe(sourcemaps.write('.'))
	.pipe(dest(cssDir))
	.pipe(browserSync.stream());

const webpackBuild = (isWatch = false) => () => new Promise((resolve, reject) => {
	webpack({ ...webpackConfig, watch: isWatch }, (err, stats) => {
		if (err) {
			return reject(err);
		}
		if (stats.hasErrors()) {
			return reject(new Error(stats.compilation.errors.join('\n')));
		}
		return resolve();
	});
});

const watchFiles = (done) => {
	watch(files.allScss, parallel(scssFiles));
	watch(files.index, parallel(indexFile));
	watch(files.hbs, parallel(hbsFiles));
	watch(files.partials, parallel(hbsFiles));
	watch(files.js, parallel(jsFiles));
	done();
};

const initServer = (done) => {
	browserSync.init({
		server: true,
		port: 8080,
		middleware: [
			function (req, res, next) {
				// Handling URL for CSS files
				if (req.url.indexOf('/sandandsky-styleguides') === 0) {
					req.url = req.url.replace(/^(\/sandandsky-styleguides)/, '');
				}
				next();
			},
		],
	});
	done();
};

const clean = () => del([cssDir]);

task(clean);
task(scssFiles);
task(initServer);
task('webpack', webpackBuild());
task('webpackWatch', webpackBuild(true));
task(
	'build',
	parallel(hbsFiles, scssFiles, 'webpack'),
);
task('watch', series(
	parallel(hbsFiles, scssFiles, 'webpackWatch'),
	watchFiles,
));
task('default', series('clean', 'watch', 'initServer'));
