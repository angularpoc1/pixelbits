const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const shell = require('gulp-shell');
const del = require('del');
const open = require('open');
const protractor = require("gulp-protractor").protractor;
const typescript = require("gulp-typescript");
var tsProject = typescript.createProject('tsconfig.json');

gulp.task('compile', function () {
    return gulp.src([
        'protractor.conf.ts',
        './tests/**/*.spec.ts'
    ], { base: '.' })
        .pipe(tsProject())
        .pipe(gulp.dest('.'));
});

gulp.task("tests", ['compile'], function () {
    return gulp.src([
        "./tests/**/*.js"
    ])
        .pipe(protractor({ configFile: "protractor.conf.js" }))
        .on('error', function (e) { throw e });
});
gulp.task("test", ['compile'], function () {
    return gulp.src(gutil.env.file)
        .pipe(tsProject())
        .pipe(protractor({
            configFile: "protractor.conf.js"
        }))
        .on('error', function (e) { throw e })
});

gulp.task("report", function() {
    return gulp.src('reports\\index.html')
    .pipe(shell("..\\node_modules\\.bin\\live-server --open=reports --port=23415"));
});