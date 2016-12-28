(function(){
'use strict'

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ["$scope"];
function LunchCheckController($scope){
  $scope.message = "";
  $scope.note = "";
  $scope.input = "";
  $scope.color = "";
  
  $scope.checkIfTooMuch = function(){
    var count = countLunchItems($scope.input);
    $scope.message = count>0 ? ( count>3 ?  "Too Much!" : "Enjoy!" ) : "Please enter data first";
    $scope.color = count>0 ? "green" : "red";
    $scope.note = "note: empty items are NOT considered";
  };
}
function countLunchItems(lunch){
  var items = lunch.split(',');
  var count = 0;
  for (var i = 0; i < items.length; i++) {
    count += ( items[i].length>0 ? 1 : 0 );
  };
  return count;
}
})();
