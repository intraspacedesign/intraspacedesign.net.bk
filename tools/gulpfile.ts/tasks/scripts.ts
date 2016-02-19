//
// style tasks
//

import { jekyll } from './jekyll'

const {
  dest, parallel, series, src, watch
} = require('gulp')
const del = require('del')
const plug = require('gulp-load-plugins')({
  lazy: true
})

const tsProject = plug.typescript.createProject('tsconfig.json')

function _src():string[] {
  return [
    ''
  ]
}

function _dest():string {
  return 'dist/js'
}

function cleanScripts() {
  console.log(`Cleaning: ${ _dest() }/**/*.{js,js.map}`)
  return del(`${ _dest() }/**/*.{js,js.map}`)
}

function cloneScripts(done) {
  done()
}

function checkScripts(done) {
  done()
}

/**
 *
 */
function compile() {
  return tsProject.src()
    .pipe(plug.sourcemaps.init())
    .pipe(plug.typescript(tsProject))
    .pipe(plug.sourcemaps.write('.'))
    .pipe(dest(_dest()))
}

/**
 *
 */
function bundle(src, dest) {
  return function buildStatic() {
    const Builder = require('jspm').Builder
    const builder = new Builder

    return builder.buildStatic(src, dest)
  }
}

function buildScripts() {
  return series(
    compile,
    bundle('dist/js/src/scripts/index.js', 'dist/js/scripts.js')
  )
}

function watchScripts(done) {
  done()
}

export {
  cleanScripts as clean,
  cloneScripts as clone,
  checkScripts as check,
  watchScripts as watch
}

export const build = buildScripts()
