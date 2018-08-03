import angular from 'angular'

import directive from './extsearch/directive'
import targets from './extsearch/targets'

export default angular
    .module('externalSearch', [])
    .value('externalSearchTargets', targets)
    .directive('externalSearch', directive)
