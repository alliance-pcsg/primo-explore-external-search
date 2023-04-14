angular
  .module('externalSearch', [])
  .value('searchTargets', [])
  .component('prmFacetAfter', {
      bindings: { parentCtrl: '<' },
      controller: ['externalSearch', function (externalSearch) {
        this.$onInit = function () {
          externalSearch.setController(this.parentCtrl)
          externalSearch.addExtSearch()
        }
      }]
  })
  .component('prmPageNavMenuAfter', {
    controller: ['externalSearch', function (externalSearch) {
      this.$onInit = function () {
        if (externalSearch.getController()) externalSearch.addExtSearch()
      }
    }]
  })
  .component('prmFacetExactAfter', {
      bindings: { parentCtrl: '<' },
      template: '<div ng-if="name === \'External Search\'">\
          <div ng-hide="$ctrl.parentCtrl.facetGroup.facetGroupCollapsed">\
              <div class="section-content animate-max-height-variable">\
                  <div class="md-chips md-chips-wrap">\
                      <div ng-repeat="target in targets" aria-live="polite" class="md-chip animate-opacity-and-scale facet-element-marker-local4">\
                          <div class="md-chip-content layout-row" role="button" tabindex="0">\
                              <strong dir="auto" title="{{ target.name }}">\
                                  <a ng-href="{{ target.url + target.mapping(queries, filters) }}" target="_blank">\
                                      <img ng-src="{{ target.img }}" width="22" height="22" alt="{{ target.alt }}" style="vertical-align:middle;"> {{ target.name }}\
                                  </a>\
                              </strong>\
                          </div>\
                      </div>\
                  </div>\
              </div>\
          </div>\
      </div>',
      controller: ['$scope', '$location', 'searchTargets', function ($scope, $location, searchTargets) {
        this.$onInit = function () {
          $scope.name = this.parentCtrl.facetGroup.name
          $scope.targets = searchTargets
          var query = $location.search().query.replace('&', '%26')
          var filter = $location.search().pfilter
          $scope.queries = Object.prototype.toString.call(query) === '[object Array]' ? query : query ? [query] : false
          $scope.filters = Object.prototype.toString.call(filter) === '[object Array]' ? filter : filter ? [filter] : false
        }
      }]
  })
  .factory('externalSearch', function () {
    return {
      getController: function () {
        return this.prmFacetCtrl || false
      },
      setController: function (controller) {
        this.prmFacetCtrl = controller
      },
      addExtSearch: function addExtSearch() {
        var xx=this;
        var checkExist = setInterval(function() {

           if (xx.prmFacetCtrl.facetService.results[0] && xx.prmFacetCtrl.facetService.results[0].name !="External Search") {
              if (xx.prmFacetCtrl.facetService.results.name !== 'External Search') {
                xx.prmFacetCtrl.facetService.results.unshift({
                  name: 'External Search',
                  displayedType: 'exact',
                  limitCount: 0,
                  facetGroupCollapsed: false,
                  values: undefined
                });
              }
              clearInterval(checkExist);
           }
        }, 100);

      }
    }
  })
