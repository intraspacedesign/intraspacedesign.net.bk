//
// style tasks
//
var _a = require('gulp'), dest = _a.dest, parallel = _a.parallel, series = _a.series, src = _a.src, watch = _a.watch;
var del = require('del');
var plug = require('gulp-load-plugins')({
    lazy: true
});
var tsProject = plug.typescript.createProject('tsconfig.json');
function _src() {
    return [
        ''
    ];
}
function _dest() {
    return 'dist/js';
}
function cleanScripts() {
    console.log("Cleaning: " + _dest() + "/**/*.{js,js.map}");
    return del(_dest() + "/**/*.{js,js.map}");
}
exports.clean = cleanScripts;
function cloneScripts(done) {
    done();
}
exports.clone = cloneScripts;
function checkScripts(done) {
    done();
}
exports.check = checkScripts;
/**
 *
 */
function compile() {
    return tsProject.src()
        .pipe(plug.sourcemaps.init())
        .pipe(plug.typescript(tsProject))
        .pipe(plug.sourcemaps.write('.'))
        .pipe(dest(_dest()));
}
/**
 *
 */
function bundle(src, dest) {
    return function buildStatic() {
        var Builder = require('jspm').Builder;
        var builder = new Builder;
        return builder.buildStatic(src, dest);
    };
}
function buildScripts() {
    return series(compile, bundle('dist/js/src/scripts/index.js', 'dist/js/scripts.js'));
}
function watchScripts(done) {
    done();
}
exports.watch = watchScripts;
exports.build = buildScripts();
