# 一点 TypeScript 尝试

使用方法：

安装 pandoc，Perl。

```bash
npm install
gulp
```

---

package.json

```json
{
  "name": "miniproj",
  "version": "1.0.0",
  "description": "A Minimal Project to Demonstrate How To Use Gulp with Visual Studio Code & TypeScript",
  "main": "dist/main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browserify": "^13.1.0",
    "gulp": "^3.9.1",
    "gulp-rename": "^1.2.2",
    "gulp-run": "^1.7.1",
    "gulp-sourcemaps": "^2.1.1",
    "gulp-typescript": "^3.0.2",
    "gulp-uglify": "^2.0.0",
    "gulp-util": "^3.0.7",
    "gulp-watch": "^4.3.10",
    "tsify": "^2.0.2",
    "typescript": "^2.0.3",
    "vinyl-buffer": "^1.0.0",
    "vinyl-source-stream": "^1.1.0",
    "watchify": "^3.7.0"
  }
}
```

tsconfig.json

```json
{
    "files": [
        "src/main.ts",
        "src/greet.ts"
    ],
    "compilerOptions": {
        "noImplicitAny": true,
        "target": "es3",
    }
}
```

gulpfile.js

```javascript
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
```
