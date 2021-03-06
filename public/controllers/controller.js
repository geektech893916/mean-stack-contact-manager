var app = angular.module('contactApp', []);
app.controller('contacCtrl', function AppCtrl($scope, $http) {
  //Request the server to get data 
  var refresh = function() {
    $http.get('/contacts').then(function(response) {
      //success
      $scope.contacts = response.data;
      $scope.contact = "";
    }, function(error) {
      //failed
      console.log(error);
    });

  }

  refresh();

  //Request the server to add data
  $scope.addContact = function() {
    $http.post('/contacts', $scope.contact).then(function(response) {
      //success
      refresh();
    }, function(error) {
      //failed
      console.log(error);
    });
  };

  $scope.remove = function(id) {
    $http.delete('/contacts/' + id).then(function(response) {
      //success
      refresh();
    }, function(error) {
      //failed
      console.log(error);
    });
  };

  $scope.edit = function(id) {
    $http.get('/contacts/' + id).then(function(response) {
      //success
      $scope.contact = response.data;
    }, function(error) {
      //failed
      console.log(error);
    });
  }

  $scope.update = function() {
    $http.put('/contacts/'+$scope.contact._id, $scope.contact).then(function(response) {
      //success
      refresh();
    }, function(error) {
      //failed
      console.log(error);
    });
  };

  $scope.clear = function () {
    $scope.contact = "";
  }
});