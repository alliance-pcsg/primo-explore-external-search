export default ['externalSearchTargets', externalSearchTargets => ({
    require: '^^prmFacet',
    restrict: 'E',
    link: (scope, element, attrs, prmFacetCtrl) => {
        console.log(prmFacetCtrl.facets)
        prmFacetCtrl.facets.splice(parseInt(attrs.index), 0, {
            name: 'External Results',
            displayedType: 'exact',
            limitCount: 0,
            facetGroupCollapsed: false,
            values: [
                {
                    displayValue: 'WorldCat',
                    name: 'External Results',
                    value: 'WorldCat',
                    count: 650,
                },
            ],
        })
    },
})]
