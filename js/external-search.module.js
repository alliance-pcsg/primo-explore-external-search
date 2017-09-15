angular
  .module('externalSearch', [])
  .value('searchTargets', [])
  .component('prmFacetAfter', {
      bindings: { parentCtrl: '<' },
      controller: ['externalSearchService', function (externalSearchService) {
        externalSearchService.controller = this.parentCtrl
        externalSearchService.addExtSearch()
      }]
  })
  .component('prmPageNavMenuAfter', {
    controller: ['externalSearchService', function (externalSearchService) {
      if (externalSearchService.controller) externalSearchService.addExtSearch()
    }]
  })
  .component('prmFacetExactAfter', {
      bindings: { parentCtrl: '<' },
      template: `
      <div ng-if="name === 'External Search'">
          <div ng-hide="$ctrl.parentCtrl.facetGroup.facetGroupCollapsed">
              <div class="section-content animate-max-height-variable">
                  <div class="md-chips md-chips-wrap">
                      <div ng-repeat="target in targets" aria-live="polite" class="md-chip animate-opacity-and-scale facet-element-marker-local4">
                          <div class="md-chip-content layout-row" role="button" tabindex="0">
                              <strong dir="auto" title="{{ target.name }}">
                                  <a ng-href="{{ target.url + target.mapping(queries, filters) }}" target="_blank">
                                      <img ng-src="{{ target.img }}" width="22" height="22" style="vertical-align:middle;"> {{ target.name }}
                                  </a>
                              </strong>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>`,
      controller: ['$scope', '$location', 'searchTargets', function ($scope, $location, searchTargets) {
        $scope.name = this.parentCtrl.facetGroup.name
        $scope.targets = searchTargets
        let query = $location.search().query
        let filter = $location.search().pfilter
        $scope.queries = Array.isArray(query) ? query : query ? [query] : false
        $scope.filters = Array.isArray(filter) ? filter : filter ? [filter] : false
      }]
  })
  .factory('externalSearchService', function () {
    return {
      get controller() {
        return this.prmFacetCtrl || false
      },
      set controller(controller) {
        this.prmFacetCtrl = controller
      },
      addExtSearch: function () {
        if (this.prmFacetCtrl.facetService.results[0].name !== 'External Search') {
          this.prmFacetCtrl.facetService.results.unshift({
            name: 'External Search',
            displayedType: 'exact',
            limitCount: 0,
            facetGroupCollapsed: false,
            values: undefined
          })
        }
      }
    }
  })
