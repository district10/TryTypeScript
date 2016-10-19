var gulp = require('gulp');
var execSync = require('child_process').execSync;
// var watch = require("gulp-watch");

gulp.task('default', function(){
    console.log("make: "+execSync('make').toString());
    gulp.watch(['*.md', '*.txt', '**/*.md', '**/*.txt'], function() {
        console.log("make: "+execSync('make').toString());
    });
});