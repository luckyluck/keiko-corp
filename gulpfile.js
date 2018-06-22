const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const concatJs = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const inject = require('gulp-inject');

gulp.task('images', function () {
    return gulp.src(['img/*.+(svg|png|gif|jpeg|jpg)'])
        .pipe(gulp.dest('docs/img'));
});

gulp.task('css-compress', function () {
    return gulp.src('css/*.css')
        .pipe(concatCss('bundle.css'))
        .pipe(cleanCSS({ compatibility: 'ie11' }))
        .pipe(gulp.dest('docs/css/'));
});

gulp.task('js-compress', function () {
    return gulp.src([
        'js/jquery.js',
        'js/ajaxchimp.js',
        'js/bootstrap.js',
        'js/nicescroll.js',
        'js/owl.carousel.min.js',
        'js/parallax.js',
        'js/scrollTo.js',
        'js/wow.js',
        'js/main.js'
    ])
        .pipe(uglify())
        .pipe(concatJs('bundle.js'))
        .pipe(gulp.dest('docs/js/'));
});

gulp.task('html-compress', function () {
    return gulp.src('index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(inject(gulp.src('./docs/**/*.js', { read: false }), { relative: true }))
        .pipe(inject(gulp.src('./docs/**/*.css', { read: false }), { relative: true }))
        .pipe(gulp.dest('docs'));
});

gulp.task('build', function (callback) {
    runSequence('images', 'css-compress', 'js-compress', 'html-compress', callback);
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: 'docs/'
        }
        // browser: 'chrome'
    });
});