'use strict'

const gulp = require('gulp')
const plug = require('gulp-load-plugins')({ lazy: true })

const autoprefixer = require('autoprefixer')

/**
 *
 */
gulp.task('serve', gulp.series(
  jekyll('build'),
  buildStyles,
  gulp.parallel(
    startWatchers,
    startServer
    )
  ))


const stylesSrc = [
  'src/**/*.scss'
]
const stylesDest = 'dist/css'

/**
 *
 */
function buildStyles() {
  return gulp.src(stylesSrc)
    .pipe(plug.sourcemaps.init())
    .pipe(plug.sass())
    .pipe(plug.flatten())
    .pipe(plug.sourcemaps.write('.'))
    .pipe(gulp.dest(stylesDest))
}

/**
 *
 */
function startWatchers(neverDone) {
  gulp.watch(stylesSrc, gulp.parallel(buildStyles))

  gulp.watch([
    '_data/**/*.*',
    '_includes/**/*.*',
    '_layouts/**/*.*',
    '_portfolio/**/*.*',
    '_posts/**/*.*',
    '{about,awards,bio,contact,design-services,philosophy,release}/**/*.*',
  ], gulp.parallel(jekyll('build')))
}

/**
 *
 */
const browserSync = require('browser-sync').create()
function startServer(neverDone) {
  return browserSync.init({
    files: [
      '_site/*.{css,html,js}',
      '_site/**/*.{css,html,js}'
    ],
    server: {
      baseDir: [
        '_site'
      ]
    }
  })
}

const exec = require('child_process').exec
function jekyll(subcommand, options) {
  return (nextTask) => {
    var cmd = ['jekyll', subcommand]
    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        cmd.push(`--${option} ${options[option]}`)
      }
    }

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