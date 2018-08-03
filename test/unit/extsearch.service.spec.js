describe('externalSearch service', function() {

  var externalSearch
  var prmFacetCtrl
  var extSearchFacet

  beforeEach(module('externalSearch'))

  beforeEach(inject(function(_externalSearch_) {
    externalSearch = _externalSearch_
    prmFacetCtrl = { facetService: { results: [ { name: 'foo' } ] }}
    extSearchFacet = {
      name: 'External Search',
      displayedType: 'exact',
      limitCount: 0,
      facetGroupCollapsed: false,
      values: undefined
    }
  }))

  describe('.getController', function() {

    it('should return the controller', function() {
      externalSearch.prmFacetCtrl = prmFacetCtrl
      expect(externalSearch.getController()).toBe(prmFacetCtrl)
    })

    it('should return false if there is no controller', function() {
      expect(externalSearch.getController()).toBe(false)
    })
  })

  describe('.setController()', function() {

    it('should store the provided controller', function() {
      externalSearch.setController(prmFacetCtrl)
      expect(externalSearch.prmFacetCtrl).toBe(prmFacetCtrl)
    })
  })

  describe('.addExtSearch()', function() {

    it('should add the external search facet', function () {
      externalSearch.prmFacetCtrl = prmFacetCtrl
      externalSearch.addExtSearch()
      expect(prmFacetCtrl.facetService.results[0]).toEqual(extSearchFacet)
    })

    it('should not add the facet if it already exists', function () {
      prmFacetCtrl.facetService.results[0] = extSearchFacet
      externalSearch.prmFacetCtrl = prmFacetCtrl
      externalSearch.addExtSearch()
      expect(prmFacetCtrl.facetService.results.length).toBe(1)
    })
  })


})
