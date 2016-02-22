//
//
//

import * as jekyll from './jekyll'
import * as scripts from './scripts'
import * as styles from './styles'

const { parallel, series } = require('gulp')

/**
 *
 */
const browserSync = require('browser-sync').create()
function startServer(neverDone) {
  return browserSync.init({
    files: [
      '_site/**/*.{css,html,js}'
    ],
    server: {
      baseDir: [
        '_site'
      ]
    }
  })
}

const CLEAN_TASKS = [
  scripts.clean,
  styles.clean
]

const CHECK_TASKS = [
  scripts.check,
  styles.check
]

const BUILD_TASKS = [
  scripts.build,
  styles.build
]

const WATCH_TASKS = [
  scripts.watch,
  styles.watch
]

export const start = series(
  ...CLEAN_TASKS,
  parallel(...BUILD_TASKS),
  jekyll.build,
  parallel(
    ...WATCH_TASKS,
    startServer,
    jekyll.watch
  )
)

export const clean = parallel(...CLEAN_TASKS)
