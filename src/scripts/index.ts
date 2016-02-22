// load angular modules
import 'angular'

// load atomic design modules
import atomic from '../../_includes/atomic'

// create the main app module
const app = angular.module('app', [ atomic ])

const DOCUMENT_READY_TIMER    = 'document.ready'
const ANGULAR_BOOTSTRAP_TIMER = 'angular.bootstrap'

// bootstrap the main app module
console.time(DOCUMENT_READY_TIMER)
angular.element(document).ready(function() {
  console.timeEnd(DOCUMENT_READY_TIMER)
  console.time(ANGULAR_BOOTSTRAP_TIMER)
  angular.bootstrap(document, [ app.name ], {
    strictDi: true
  })
  console.timeEnd(ANGULAR_BOOTSTRAP_TIMER)
})
