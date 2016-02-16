import 'angular'
import app from './image'

console.log(angular)

angular.element(document).ready(function() {
  angular.bootstrap(document, [ app ], {
    strictDi: true
  })
})

export default app