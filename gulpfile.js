var gulp        = require("gulp");
var less        = require("gulp-less-sourcemap");
var watch       = require("gulp-watch");
var path        = require("path");
var livereload  = require("gulp-livereload");
var gutil       = require("gulp-util");
var gulpIgnore  = require("gulp-ignore");


gulp.task("default", ["compile-less", "watch"]);


gulp.task("compile-less", function() {
    return gulp
        .src("./src/**/*.less")
        .pipe(less({paths: [path.join(__dirname, "less", "includes")]}))
        .on("error", function (err) { gutil.log(err); })
        .pipe(gulp.dest("./src"))
        .pipe(livereload());        
});


gulp.task("reload", function() {
    livereload.changed("");
});


gulp.task("watch", function() {
    livereload.listen();

    gulp.watch("./src/**/*.less", ["compile-less"]);
    gulp.watch("./src/**/*.{html, js}", ["reload"]);
});