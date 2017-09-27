describe('prmFacetAfter component', function () {

  var $componentController
  
  var externalSearch
  var prmFacetCtrl

  beforeEach(module('externalSearch'))

  beforeEach(module(function($provide) {
    $provide.factory('externalSearch', function () {
      externalSearch = {
        addExtSearch: jasmine.createSpy(),
        setController: jasmine.createSpy(),
      }
      return externalSearch
    })
  }))

  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_
    prmFacetCtrl = { }
  }))

  it('should pass its parent controller to externalSearch service', function () {
    $componentController('prmFacetAfter', { parentCtrl: prmFacetCtrl }).$onInit()
    expect(externalSearch.setController).toHaveBeenCalled()
  })

  it('should initialize the search facet', function () {
    $componentController('prmFacetAfter').$onInit()
    expect(externalSearch.addExtSearch).toHaveBeenCalled()
  })

})
