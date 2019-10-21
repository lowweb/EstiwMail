const gulp= require('gulp'),
	  // rigger = require('gulp-rigger'),
      pagebuilder = require('gulp-pagebuilder'),
      watch = require('gulp-watch'),
      browserSync = require("browser-sync"),
      reload = browserSync.reload,
      rimraf = require('rimraf'),
      plumber = require('gulp-plumber'),
      notify = require('gulp-notify'),
      pug = require('gulp-pug');
      
      var path = {
        build: { 
            html: 'build/'
        },
        src: {
            html: 'src/html/*.pug'
        },
        watch: { 
            html: 'src/html/**/*.pug'
        },
        clean: './build'
    };	  
    gulp.task('html:build', function() {
        return gulp.src(path.src.html)
            .pipe(plumber({
             errorHandler: notify.onError()
            }))
            .pipe(pug())
            .pipe(gulp.dest(path.build.html))
            .pipe(reload({stream: true}));
      });

    gulp.task("serve", () => {
        browserSync.init({
            server: "./build/",
            port: 8080,
            notify: true
        });
    
        gulp.watch(path.watch.html, gulp.parallel("html:build"));
    });

    gulp.task('clean', function (cb) {
        rimraf(path.clean, cb);
    });

    
    var runTasks = gulp.series("clean", "html:build", "serve");

    exports.default = runTasks