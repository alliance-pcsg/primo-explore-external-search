describe('prmPageNavMenuAfter component', function () {

  var $componentController
  
  var externalSearch

  beforeEach(module('externalSearch'))

  beforeEach(module(function($provide) {
    $provide.factory('externalSearch', function () {
      externalSearch = {
        addExtSearch: jasmine.createSpy(),
        getController: function () { }
      }
      return externalSearch
    })
  }))

  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_
  }))

  it('should initialize the search facet if there is a controller', function () {
    var prmPageNavMenuAfterCtrl = $componentController('prmPageNavMenuAfter')
    spyOn(externalSearch, 'getController').and.returnValue({})
    prmPageNavMenuAfterCtrl.$onInit()
    expect(externalSearch.addExtSearch).toHaveBeenCalled()
  })

  it('should not initialize the search facet if there is not a controller yet', function () {
    var prmPageNavMenuAfterCtrl = $componentController('prmPageNavMenuAfter')
    spyOn(externalSearch, 'getController').and.returnValue(false)
    prmPageNavMenuAfterCtrl.$onInit()
    expect(externalSearch.addExtSearch).not.toHaveBeenCalled()
  })

})
