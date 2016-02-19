require('angular');
var image_1 = require('./image');
console.log(angular);
angular.element(document).ready(function () {
    angular.bootstrap(document, [image_1.default], {
        strictDi: true
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = image_1.default;
