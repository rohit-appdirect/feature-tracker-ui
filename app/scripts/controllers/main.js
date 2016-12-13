'use strict';

/**
 * @ngdoc function
 * @name featureTrackerUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the featureTrackerUiApp
 */
angular.module('featureTrackerUiApp')
  .controller('MainCtrl', function ($scope, dataService) {
    dataService.getPR().then(function(response) {
        $scope.myData = response.data;
    })
  });
