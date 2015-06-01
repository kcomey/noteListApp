var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http',
  function ($scope, $http) {
    console.log("Hello from controller");

var refresh = function() {
  $http.get('/api/notes').success(function(response) {
    console.log('I got the data');
    $scope.notelist = response;
    $scope.note = "";
  });
};

refresh();

  $scope.addNote = function() {
    console.log($scope.note);
    $http.post('/api/notes', $scope.note).success(function(response) {
      console.log(response);
      refresh();
    });
  }

}]);
