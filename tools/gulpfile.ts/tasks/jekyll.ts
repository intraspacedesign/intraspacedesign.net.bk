//
//
//

const exec = require('child_process').exec
export function jekyll(subcommand) {
  return (nextTask) => {
    var cmd = ['jekyll', subcommand]

    exec(cmd.join(' '), (error, stdout, stderr) => {
      console.log('stdout: ' + stdout)
      console.log('stderr: ' + stderr)
      if (error !== null) {
        console.log('exec error: ' + error)
      }
      if (nextTask) {
        nextTask()
      }
    })
  }
}