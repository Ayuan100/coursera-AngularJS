(function(){
  'use strict'

  angular.module('NarrowDownChoiceApp', [])
  .controller('NarrowDownChoiceController', NarrowDownChoiceController)
  .service('SearchItemsService', SearchItemsService);

  NarrowDownChoiceController.$inject = ["$scope", "SearchItemsService"];
  function NarrowDownChoiceController($scope, SearchItemsService){
    var controller = this;
    controller.foundList = [];

    controller.narrowDown = function (input){
      var promise = SearchItemsService.getAllItems();

      promise.then( function (result){

        SearchItemsService.searchItems(result.data.menu_items, input);
        controller.foundList = SearchItemsService.getFoundItems();

      }).catch( function(error){
        console.log(error);
      })
    };

    controller.removeThisOne = function (index){
      SearchItemsService.removeItem(index);
      controller.foundList = SearchItemsService.getFoundItems();
    }

  }

SearchItemsService.$inject = ["$http", "$filter"];
  function SearchItemsService($http, $filter){
    var service = this;
    service.found = [];

    service.searchItems = function(array, input){

      // console.log("in filterInArray function, array is: ");
      // console.log(array);
      // console.log("input is: " + input);

      service.found = $filter('filter')(array, input);

      // console.log("service.found is ");
      // console.log(service.found);

    };

    service.removeItem = function(index){
      // console.log("return value of slice: ");
      service.found.splice(index, 1);
      // console.log("index: " + index);
      // console.log("service.found in removeItem: ");
      // console.log(service.found);
    };

    service.getFoundItems = function(){
      return service.found;
    }

    service.getAllItems = function(){
      var sendRequest = $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      });
      return sendRequest;
    };

  }
})();
