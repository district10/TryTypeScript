var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var watch = require("gulp-watch");
var paths = {
    statics: ['src/*.html', 'src/statics/*.css', 'src/statics/*.js'],
    mdsrcs: ['src/*.md', 'README.txt']
};
var execSync = require('child_process').execSync;
var run = require('gulp-run');
var rename = require('gulp-rename');

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task("copy-statics", function () {
    return gulp.src(paths.statics)
        .pipe(gulp.dest("dist"));
});
gulp.task("md2html", function () {
    // return watch(paths.mdsrcs, { ignoreInitial: true })
    return gulp.src(paths.mdsrcs)
            .pipe(run("perl tools/drawer.pl"))
            .pipe(run("pandoc --ascii --template src/statics/html.template"))
            .pipe(rename(function (path) { path.extname = ".html" }))
            .pipe(gulp.dest("dist"));
});
gulp.task("doc", function () {
    return watch(paths.mdsrcs, { ignoreInitial: true })
            .pipe(run("perl tools/drawer.pl"))
            .pipe(run("pandoc --ascii --template src/statics/html.template"))
            .pipe(rename(function (path) { path.extname = ".html" }))
            .pipe(gulp.dest("dist"));
});

function bundle() {
    console.log("pwd: "+execSync('pwd').toString());
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
}

gulp.task("default", ["copy-statics", "md2html"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);