//
//
//
var module = angular.module('Atomic.Organisms.ImageRotator', []);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = module.name;
module
    .run(runBlock)
    .directive('imageRotator', imageRotator)
    .directive('imageRotatorOutlet', imageRotatorOutlet)
    .directive('imageRotatorCollection', imageRotatorCollection);
runBlock.$inject = [];
function runBlock() {
    console.log('run');
}
imageRotator.$inject = [];
function imageRotator() {
    return {
        controller: function () {
            var vm = this;
            vm.registery = [];
            vm.register = function (collection) {
                vm.registery = vm.registery.concat(collection);
                vm.imageOutletSrc = vm.registery[0].src;
            };
        },
        link: function (scope, element, attrs) {
            //console.log(scope)
        }
    };
}
imageRotatorOutlet.$inject = [];
function imageRotatorOutlet() {
    return {
        link: function (scope, element, attrs) {
        }
    };
}
imageRotatorCollection.$inject = [];
function imageRotatorCollection() {
    return {
        require: ['^imageRotator'],
        link: function (scope, element, attrs, ctrl) {
            ctrl[0].register(element[0].children);
        }
    };
}

//# sourceMappingURL=image_rotator.js.map
