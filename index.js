angular
  .module('externalSearch', [])
  .component('prmFacetAfter', {
      bindings: { parentCtrl: '<' },
      controller: ['collapsed', function (collapsed) {
        this.parentCtrl.facetService.results.unshift({
            name: 'External Search',
            displayedType: 'exact',
            limitCount: 0,
            facetGroupCollapsed: collapsed,
            values: undefined
        })
      }]
  })
  .component('prmFacetExactAfter', {
      bindings: { parentCtrl: '<' },
      template: `
      <div ng-if="name === 'External Search'">
          <div ng-hide="$ctrl.parentCtrl.facetGroup.facetGroupCollapsed">
              <div aria-hidden="{{ !collapsed }}" class="section-content animate-max-height-variable">
                  <div class="md-chips md-chips-wrap">
                      <div ng-repeat="target in targets" aria-live="polite" class="md-chip animate-opacity-and-scale facet-element-marker-local4">
                          <div class="md-chip-content layout-row" role="button" tabindex="0">
                              <strong dir="auto" title="{{ target.name }}">
                                  <a ng-href="{{ target.url + target.mapping(search) }}" target="_blank">
                                      <img ng-src="{{ target.img }}" width="22" height="22" style="vertical-align:middle;"> {{ target.name }}
                                  </a>
                              </strong>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>`,
      controller: ['$scope', '$location', 'targets', function ($scope, $location, targets) {
        $scope.name = this.parentCtrl.facetGroup.name
        $scope.search = $location.search().query
        $scope.targets = targets
      }]
  })
