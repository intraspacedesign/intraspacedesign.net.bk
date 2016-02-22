//
// jekyll tasks
//

const { exec } = require('child_process')
const { watch } = require('gulp')

function jekyll(subcommand, next) {
  var cmd = ['jekyll', subcommand]

  exec(cmd.join(' '), (error, stdout, stderr) => {
    console.log('stdout: ' + stdout)
    console.log('stderr: ' + stderr)
    if (error !== null) {
      console.log('exec error: ' + error)
    }
    if (next) {
      next()
    }
  })
}

/**
 *
 */
function buildJekyll(next) {
  return jekyll('build', next)
}

/**
 *
 */
function watchJekyll(neverDone) {
  return watch([
    '**/*.{csv,html,yml}',
    '!_site/**'
  ], jekyll('build', false))
}

export {
  buildJekyll as build,
  watchJekyll as watch
}