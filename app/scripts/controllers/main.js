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

    //Column defination for grid
    $scope.gridOptions = {
        enableColumnResizing: true,
        columnDefs: [
            { field: 'jira_ticket'},
            { field: 'feature'},
            { field: 'pr_no' },
            { field: 'screen_cast' },
            { field: 'Ui_review_status'},
            { field: 'team' },
            { field: 'dev' },
            { field: 'pm'},
            { field: 'notes' },
            { field: 'QA' },
            { field: 'Release notes'},
            { field: 'Blocker'}
        ]
    };

    //Call data service to get the last updated data in database dump
    dataService.getPR().then(function(response) {
        $scope.gridOptions = response.data;
    })
  });
