//
//
//
var exec = require('child_process').exec;
function jekyll(subcommand) {
    return function (nextTask) {
        var cmd = ['jekyll', subcommand];
        exec(cmd.join(' '), function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            if (nextTask) {
                nextTask();
            }
        });
    };
}
exports.jekyll = jekyll;
