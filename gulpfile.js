"use strict";

const gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	pump = require('pump'),
	babel = require('gulp-babel');
	

const srv = 'html5.less:82';

var myScripts = [
	"./app/script/my.js",
	"./app/script/my2.js",
]



function scripts() {

	return gulp.src(myScripts)
		.pipe(concat('common.min.js'))
		.pipe(babel({
            presets: ['env']
        }))
		.pipe(uglify())
		.pipe(gulp.dest('app/common/script'));
}

function styles(){
	return gulp.src('./app/scss/style.scss')
	.pipe(sass())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/common/css'));
}


function defaultTask() {


}


gulp.task('server', function(){

	browserSync.init({
        proxy: srv
    });
	
	gulp.watch('app/scss/**/*.scss',gulp.series('style')).on('change', browserSync.reload);
	gulp.watch('app/script/**/*.js', gulp.series('script')).on('change', browserSync.reload);

	gulp.watch('app/**/*.php').on('change', browserSync.reload);
	gulp.watch('app/**/*.html').on('change', browserSync.reload);
});
exports.script = scripts;
exports.style = styles;




gulp.task('default',gulp.series('server'));


// exports.default = defaultTask;

// gulp.task('script', scripts);

