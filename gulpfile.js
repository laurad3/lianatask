var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var prefix = require('gulp-autoprefixer');

gulp.task('default', gulp.series(gulpSass, gulpJs, gulpWatch));

var jsFOLDER = './src/js/';
var jsFILES = ['main.js'];

function gulpSass() {
    return gulp.src('./src/scss/**/*.scss') // our files
    .pipe(sass({
        outputStyle: 'compressed', // nested | compact | exanded | compressed
        includePaths: ['node_modules/breakpoint-sass/stylesheets']
    }).on('error', sass.logError)) // catch errors
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('./frontend/css'));
}

gulp.task(gulpSass);

function gulpJs(done) {
    jsFILES.map(function (entry) {
        return browserify({
            entries: [jsFOLDER + entry],
            debug: true,
        })
        .transform(babelify, {
            presets: ['@babel/preset-env']
        })
        .bundle()
        .pipe(source(entry))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./frontend/js'));
    });

    done();
}

gulp.task(gulpJs);

function gulpWatch() {
    gulp.watch('./src/scss/**/*.scss', gulpSass);
    gulp.watch('./src/js/**/*.js', gulpJs);
}

gulp.task(gulpWatch);