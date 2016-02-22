//
// style tasks
//
var _a = require('gulp'), dest = _a.dest, parallel = _a.parallel, series = _a.series, src = _a.src, watch = _a.watch;
var del = require('del');
var plug = require('gulp-load-plugins')({
    lazy: true
});
/**
 *
 */
function _src() {
    return [
        '**/*.scss',
        '!_site/**',
        '!jspm_packages/**',
        '!node_modules/**'
    ];
}
/**
 *
 */
function _dest() {
    return 'dist/css';
}
/**
 *
 */
function cleanStyles() {
    console.log("Cleaning: " + _dest() + "/**/*.{css,css.map}");
    return del(_dest() + "/**/*.{css,css.map}");
}
exports.clean = cleanStyles;
/**
 *
 */
function cloneStyles(done) {
    done();
}
exports.clone = cloneStyles;
/**
 *
 */
function checkStyles() {
    var config = {
        bundleExec: true
    };
    return src(_src())
        .pipe(plug.scssLint(config));
}
exports.check = checkStyles;
/**
 *
 */
function buildStyles() {
    return src(_src())
        .pipe(plug.sourcemaps.init())
        .pipe(plug.sass())
        .pipe(plug.flatten())
        .pipe(plug.sourcemaps.write('.'))
        .pipe(dest(_dest()))
        .pipe(dest('_site/dist/css'));
}
exports.build = buildStyles;
/**
 *
 */
function watchStyles() {
    return watch(_src(), series(cleanStyles, parallel(cleanStyles, buildStyles)));
}
exports.watch = watchStyles;
