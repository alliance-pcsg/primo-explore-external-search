var extsearch = (function (angular) {
    'use strict';

    angular = angular && angular.hasOwnProperty('default') ? angular['default'] : angular;

    var directive = ['externalSearchTargets', function (externalSearchTargets) {
      return {
        require: '^^prmFacet',
        restrict: 'E',
        link: function link(scope, element, attrs, prmFacetCtrl) {
          console.log(prmFacetCtrl.facets);
          prmFacetCtrl.facets.splice(parseInt(attrs.index), 0, {
            name: 'External Results',
            displayedType: 'exact',
            limitCount: 0,
            facetGroupCollapsed: false,
            values: [{
              displayValue: 'WorldCat',
              name: 'External Results',
              value: 'WorldCat',
              count: 650
            }]
          });
        }
      };
    }];

    var worldcat = {
      'any': 'kw',
      'title': 'ti',
      'creator': 'au',
      'subject': 'su',
      'isbn': 'bn',
      'issn': 'n2'
    };

    var targets = {
      worldcat: function worldcat$$1(queries, filters) {
        try {
          return 'queryString=' + queries.map(function (part) {
            var terms = part.split(',');
            var type = worldcat[terms[0]] || 'kw';
            var string = terms[2] || '';
            var join = terms[3] || '';
            return type + ':' + string + ' ' + join + ' ';
          }).join('');
        } catch (e) {
          return '';
        }
      },
      gscholar: function gscholar(queries, filters) {
        try {
          return queries.map(function (part) {
            return part.split(',')[2] || '';
          }).join(' ');
        } catch (e) {
          return '';
        }
      }
    };

    var module$1 = angular.module('externalSearch', []).value('externalSearchTargets', targets).directive('externalSearch', directive);

    return module$1;

}(angular));
//# sourceMappingURL=extsearch.js.map
