const gulp= require('gulp'),
	  // rigger = require('gulp-rigger'),
      pagebuilder = require('gulp-pagebuilder'),
      watch = require('gulp-watch'),
      browserSync = require("browser-sync"),
      reload = browserSync.reload;
      
      var path = {
        build: { 
            html: 'build/'
        },
        src: {
            html: 'src/html/*.html'
        },
        watch: { 
            html: 'src/html/**/*.html'
        },
        clean: './build'
    };	  
    
    gulp.task('html:build', function () {
         return gulp.src(path.src.html)
            // .pipe(rigger())
            .pipe(pagebuilder('src'))
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

    var runTasks = gulp.series("html:build","serve");

    exports.default = runTasks