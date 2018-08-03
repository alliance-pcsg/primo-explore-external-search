describe('prmFacetExactAfter component', function () {

  var $componentController
  var $scope
  var $location

  var searchTargets
  var prmFacetCtrl

  beforeEach(module('externalSearch'))

  beforeEach(module(function($provide) {
    $provide.factory('searchTargets', function () {
      searchTargets = [
        {
          name: 'test1',
          url: 'http://one.com?',
          img: 'http://one.com/image.jpg',
          mapping: jasmine.createSpy()
        },
        {
          name: 'test2',
          url: 'http://two.com?',
          img: 'http://two.com/image.jpg',
          mapping: jasmine.createSpy()
        }
      ]
      return searchTargets
    })
  }))

  beforeEach(inject(function(_$componentController_, _$rootScope_, _$location_) {
    $componentController = _$componentController_
    $scope = _$rootScope_
    $location = _$location_
    prmFacetCtrl = { facetGroup: { name: 'foo' }}
  }))

  it('should store the name of its facet group', function () {
    $componentController('prmFacetExactAfter', { $scope: $scope }, { parentCtrl: prmFacetCtrl }).$onInit()
    expect($scope.name).toBe('foo')
  })

  it('should store the provided external search targets', function () {
    $componentController('prmFacetExactAfter', { $scope: $scope }, { parentCtrl: prmFacetCtrl }).$onInit()
    expect($scope.targets).toEqual(searchTargets)
  })

  it('should store an array of queries if there are multiple queries', function () {
    var prmFacetExactAfterCtrl = $componentController('prmFacetExactAfter', { $scope: $scope }, { parentCtrl: prmFacetCtrl })
    spyOn($location, 'search').and.returnValue({
      query: [ 'any,contains,dogs,AND', 'creator,begins_with,me,AND' ]
    })
    prmFacetExactAfterCtrl.$onInit()
    expect($scope.queries).toEqual(jasmine.any(Array))
  })

  it('should store an array of queries if there is a single query', function () {
    var prmFacetExactAfterCtrl = $componentController('prmFacetExactAfter', { $scope: $scope }, { parentCtrl: prmFacetCtrl })
    spyOn($location, 'search').and.returnValue({ query: 'any,contains,dogs,AND' })
    prmFacetExactAfterCtrl.$onInit()
    expect($scope.queries).toEqual(jasmine.any(Array))
  })

  it('should store false if there are no queries', function () {
    var prmFacetExactAfterCtrl = $componentController('prmFacetExactAfter', { $scope: $scope }, { parentCtrl: prmFacetCtrl })
    spyOn($location, 'search').and.returnValue({ query: undefined })
    prmFacetExactAfterCtrl.$onInit()
    expect($scope.queries).toBe(false)
  })

  it('should store an array of filters if there are multiple filters', function () {
    var prmFacetExactAfterCtrl = $componentController('prmFacetExactAfter', { $scope: $scope }, { parentCtrl: prmFacetCtrl })
    spyOn($location, 'search').and.returnValue({
      pfilter: [ 'pfilter,exact,articles,AND', 'pfilter,exact,ebooks,AND' ]
    })
    prmFacetExactAfterCtrl.$onInit()
    expect($scope.filters).toEqual(jasmine.any(Array))
  })

  it('should store an array of filters if there is a single filter', function () {
    var prmFacetExactAfterCtrl = $componentController('prmFacetExactAfter', { $scope: $scope }, { parentCtrl: prmFacetCtrl })
    spyOn($location, 'search').and.returnValue({ pfilter: 'pfilter,exact,articles,AND' })
    prmFacetExactAfterCtrl.$onInit()
    expect($scope.filters).toEqual(jasmine.any(Array))
  })

  it('should store false if there are no filters', function () {
    var prmFacetExactAfterCtrl = $componentController('prmFacetExactAfter', { $scope: $scope }, { parentCtrl: prmFacetCtrl })
    spyOn($location, 'search').and.returnValue({ pfilter: undefined })
    prmFacetExactAfterCtrl.$onInit()
    expect($scope.filters).toBe(false)
  })

})
