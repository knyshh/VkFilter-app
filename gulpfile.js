var gulp = require('gulp');
var browserify = require('gulp-browserify');
//var browserSync = require('browser-sync');
var browserSync = require('browser-sync');

gulp.task('server', function () {
    browserSync({
        port: 3000,
        server: {
            baseDir: './'
        }
    });
});
gulp.task('scripts', function() {

    gulp.src('src/js/script.js')
        .pipe(browserify({
            //insertGlobals : true,
            //debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./public/js'));
});

/*gulp.task('watch', function () {
    gulp.watch([
        'app/*.html',
        'app/*.php',
        //'app/js/**///*.js',
        //'app/css/**.css'
    //]).on('change', browserSync.reload);
//});

gulp.task('watch', ['scripts'], function () {
    gulp.watch(
        './src/js/**/*.js',
        ['scripts']
    ).on('change', browserSync.reload);
});


//gulp.task('default', ['scripts']);

gulp.task('default', ['scripts' , 'server']);