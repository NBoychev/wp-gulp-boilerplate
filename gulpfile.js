var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


// SASS task
gulp.task('sass', function() {
    gulp.src(['./src/sass/app.scss'])

        // Initialize the sourcemap
        .pipe(sourcemaps.init())

        // Compile SASS
        .pipe(sass().on('error', sass.logError))

        // Add vendor prefixes
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))

        // Minify CSS
        .pipe(cleanCSS())

        // Write the sourcemap
        .pipe(sourcemaps.write())

        // Save the processed css to file
        .pipe(gulp.dest('./assets/css'));
});


// SASS Watch task
gulp.task('sass:watch', function() {
    gulp.watch(['./src/sass/**/*.scss'], ['sass']);
});


// JS task
gulp.task('js', function() {
    gulp.src([
            './src/js/modules/**/*.js',
            './src/js/app.js'
        ])

        // Concat JS 
        .pipe(concat('app.js'))

        // Minify JS
        .pipe(uglify())

        // Save the processed js to file
        .pipe(gulp.dest('./assets/js'))
})


// JS Watch task
gulp.task('js:watch', function() {
    gulp.watch(['./src/js/**/*.js'], ['js']);
});


// Serve task
gulp.task('serve', ['sass', 'sass:watch', 'js', 'js:watch']);


// Build task
gulp.task('build', ['sass', 'js']);


// Default task (used for fallback, when running gulp, without task specified.)
gulp.task('default', ['serve']);
