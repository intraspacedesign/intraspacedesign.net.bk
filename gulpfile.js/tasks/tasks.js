//
//
//
var jekyll = require('./jekyll');
var scripts = require('./scripts');
var styles = require('./styles');
var _a = require('gulp'), parallel = _a.parallel, series = _a.series;
/**
 *
 */
var browserSync = require('browser-sync').create();
function startServer(neverDone) {
    return browserSync.init({
        files: [
            '_site/**/*.{css,html,js}',
            'dist/**/*.{css,js}'
        ],
        server: {
            baseDir: [
                'dist', '_site'
            ]
        }
    });
}
var CLEAN_TASKS = [
    scripts.clean,
    styles.clean
];
var CHECK_TASKS = [
    scripts.check,
    styles.check
];
var BUILD_TASKS = [
    scripts.build,
    styles.build
];
var WATCH_TASKS = [
    scripts.watch,
    styles.watch
];
exports.start = series.apply(void 0, CLEAN_TASKS.concat([parallel.apply(void 0, BUILD_TASKS), jekyll.build, parallel.apply(void 0, WATCH_TASKS.concat([startServer, jekyll.watch]))]));
exports.clean = parallel.apply(void 0, CLEAN_TASKS);
