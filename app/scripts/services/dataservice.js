'use strict';

/**
 * @ngdoc service
 * @name featureTrackerUiApp.dataService
 * @description
 * # dataService
 * Service in the featureTrackerUiApp.
 */
angular.module('featureTrackerUiApp')
  .service('dataService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var dataService = {};

    //Gets the list of nuclear weapons
    dataService.getPR = function() {
        return $http.get('json/pulls.json')
        .then(function(data) {
            return data;
        });
    };
    return dataService;

  });
