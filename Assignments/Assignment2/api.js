(function(){
  'use strict'

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService){
    var toBuyList = this;

    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

    toBuyList.checkOffItem = function(itemIndex){
      ShoppingListCheckOffService.checkOffItem(itemIndex);
    }
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var alreadyBoughtList = this;
    alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  }

  function ShoppingListCheckOffService(){
    var service = this;

    // List of shopping items
    var toBuyItems = [
      {name: 'cookies',quantity: 5},
      {name: 'juice',quantity: 2},
      {name: 'yogurt',quantity: 8},
      {name: 'bread',quantity: 3},
      {name: 'snack',quantity: 10}
    ];
    var alreadyBoughtItems = [];

    service.checkOffItem = function (itemIndex) {
      alreadyBoughtItems.push(toBuyItems[itemIndex]);
      toBuyItems.splice(itemIndex, 1);

    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };
    service.getAlreadyBoughtItems = function () {
      return alreadyBoughtItems;
    };


  }
})();
