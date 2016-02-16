'use strict'

const gulp = require('gulp')
const plug = require('gulp-load-plugins')({ lazy: true })

const autoprefixer = require('autoprefixer')

const buildScripts = gulp.series(
  buildTypeScript,
  builder('dist/js/src/scripts/index.js', 'dist/js/scripts.js')
)

/**
 *
 */
gulp.task('serve', gulp.series(
  jekyll('build'),
  buildStyles,
  buildScripts,
  gulp.parallel(
    startWatchers,
    startServer
    )
  ))


const scriptsSrc = [
  'src/**/*.ts'
]

const scriptsDest = 'dist/js'

/**
 *
 */
const tsProject = plug.typescript.createProject('tsconfig.json')
function buildTypeScript() {
  return tsProject.src()
    .pipe(plug.sourcemaps.init())
    .pipe(plug.typescript(tsProject))
    .pipe(plug.sourcemaps.write('.'))
    .pipe(gulp.dest(scriptsDest))
}

/**
 *
 */
function builder(src, dest) {
  return function buildStatic() {
    const Builder = require('jspm').Builder
    const builder = new Builder

    return builder.buildStatic(src, dest)
  }
}

const stylesSrc = [
  '_includes/**/*.scss',
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
  gulp.watch(stylesSrc, gulp.series(buildStyles, jekyll('build')))
  gulp.watch(scriptsSrc, gulp.series(buildScripts, jekyll('build')))
  gulp.watch([
    '**/*.{csv,html,yml}',
    '!_site/**'
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
      '_site/**/*.{css,html,js}',
      'dist/**/*.{css,js}'
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