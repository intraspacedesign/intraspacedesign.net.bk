//
// jekyll tasks
//
var exec = require('child_process').exec;
var watch = require('gulp').watch;
function jekyll(subcommand, next) {
    var cmd = ['jekyll', subcommand];
    exec(cmd.join(' '), function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        if (next) {
            next();
        }
    });
}
/**
 *
 */
function buildJekyll(next) {
    return jekyll('build', next);
}
exports.build = buildJekyll;
/**
 *
 */
function watchJekyll(neverDone) {
    return watch([
        '**/*.{csv,html,yml}',
        '!_site/**'
    ], jekyll('build', false));
}
exports.watch = watchJekyll;
