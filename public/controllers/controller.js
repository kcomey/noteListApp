var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.greet = "My Note Service";

    $http.get('/api/notes').success(function(response) {
      $scope.notelist = response;
      $scope.note = "";
    });

  $scope.addNote = function() {
    $http.post('/api/notes', $scope.note).success(function(response) {
      console.log(response);
      $scope.notelist.push(response);
      $scope.note = "";
    });
  };

  $scope.remove = function(id) {
    $http.delete('/api/notes/' + id).success(function(response) {
      for(var i = 0; i < $scope.notelist.length; i++) {
        if($scope.notelist[i]._id === id) {
          $scope.notelist.splice(i, 1);
          break;
        }
      }
    });
  };

  $scope.edit = function(id) {
    $http.get('/api/notes/' + id).success(function(response) {
      $scope.note = response;
    });
  };

  $scope.update = function() {
    $http.put('/api/notes/' + $scope.note._id, $scope.note)
      .success(function(response) {
      for(var i = 0; i < $scope.notelist.length; i++) {
        if($scope.notelist[i]._id === response._id) {
          $scope.notelist[i].note = response.note;
          $scope.notelist[i].author = response.author;
          $scope.note = "";
          break;
        }
      }
    });
  };

  $scope.deselect = function() {
    $scope.note = "";
  };

}]);
