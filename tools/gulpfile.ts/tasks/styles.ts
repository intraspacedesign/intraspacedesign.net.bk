//
// style tasks
//

import * as jekyll from './jekyll'

const {
  dest, parallel, series, src, watch
} = require('gulp')
const del = require('del')
const plug = require('gulp-load-plugins')({
  lazy: true
})

/**
 *
 */
function _src():string[] {
  return [
    '**/*.scss',
    '!_site/**',
    '!jspm_packages/**',
    '!node_modules/**'
  ]
}

/**
 *
 */
function _dest():string {
  return 'dist/css'
}

/**
 *
 */
function cleanStyles() {
  console.log(`Cleaning: ${ _dest() }/**/*.{css,css.map}`)
  return del(`${ _dest() }/**/*.{css,css.map}`)
}

/**
 *
 */
function cloneStyles(done) {
  done()
}

/**
 *
 */
function checkStyles() {
  const config = {
    bundleExec: true
  }

  return src(_src())
    .pipe(plug.scssLint(config))
}

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
    .pipe(dest('_site/dist/css'))
}

/**
 *
 */
function watchStyles() {
  return watch(_src(),
    series(
      cleanStyles,
      parallel(
        cleanStyles,
        buildStyles
      )
    )
  )
}

export {
  cleanStyles as clean,
  cloneStyles as clone,
  checkStyles as check,
  buildStyles as build,
  watchStyles as watch
}