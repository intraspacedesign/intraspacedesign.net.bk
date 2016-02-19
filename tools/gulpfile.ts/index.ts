const { task } = require('gulp')

import { start, clean } from './tasks/tasks'

task('start', start)

task('clean', clean)