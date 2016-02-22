import { ORGANISMS } from './organisms/organisms'

const ngModule = angular.module('Atomic', [
  ...ORGANISMS
])

export default ngModule.name
