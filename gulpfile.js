var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    data = require('gulp-data'),
    stylus = require('gulp-stylus'),
    imagemin = require('gulp-imagemin'),
    concatify = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver'),
    data = require('gulp-data'),
    htmlmin = require('gulp-htmlmin');

// Paths to various files
var paths = {
    scripts: ['js/*.js'],
    styles: ['css/*.css'],
    images: ['image/*'],
    content: ['index.html']
}

// Compiles scss files and outputs them to build/css/*.css
gulp.task('styles', function() {
    gulp.src('css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./build/css'))
});

// // Concats & minifies js files and outputs them to build/js/app.js 
// gulp.task('scripts', function() {
//     return gulp.src(paths.scripts)
//         .pipe(sourcemaps.init())
//         .pipe(uglify())
//         .pipe(concatify('app.js'))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('./build/js/'));
// });

// Minifies our HTML files and outputs them to build/*.html
gulp.task('content', function() {
    return gulp.src(paths.content)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build'));
});

// Optimizes our image files and outputs them to build/image/*
gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('./build/image'))
})

// Watches for changes to our files and executes required scripts
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.content, ['content']);
    gulp.watch(paths.images, ['images']);
});

// Launches a test webserver
gulp.task('webserver', function() {
    gulp.src('build')
        .pipe(webserver({
            livereload: true,
            port: 1111
        }));
});


gulp.task('default', ['styles', 'content', 'images', 'watch', 'webserver']);