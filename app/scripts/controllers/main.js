'use strict';

/**
 * @ngdoc function
 * @name featureTrackerUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the featureTrackerUiApp
 */
angular.module('featureTrackerUiApp')
  .controller('MainCtrl', function ($scope, $filter, dataService) {

    var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
                       '  <a href="{{row.getProperty(col.field)}}">{{row.getProperty(col.field)}}</a>' +
                       '</div>';
    //Column defination for grid
    $scope.gridOptions = {
        enableColumnResizing: true,
        enableFiltering: true,
        columnDefs: [
            { field: 'jiraTicket.jiraId', name: 'jira_ticket', minWidth: 110, width: 110, enableColumnResizing: true},
            { field: 'jiraTicket.jiraSummary', name: 'feature', minWidth: 150, width: 150, enableColumnResizing: true},
            { field: 'pr.prNumber', name: 'pr_number', minWidth: 90, width: 90, enableColumnResizing: true },
            { field: 'pr.prLabels', name:'labels', minWidth: 150, width: 150, enableColumnResizing: true},
            { field: 'team', name: "team" , minWidth: 80, width: 80, enableColumnResizing: true},
            { field: 'developer', name: 'dev', minWidth: 120, width: 120, enableColumnResizing: true },
            { field: 'pr.screencastLink', name: 'DEMO', minWidth: 80, width: 80, enableColumnResizing: true },
            { field: 'pm', name: 'pm', minWidth: 120, width: 120, enableColumnResizing: true},
            { field: 'pr.testRailLinks', name: 'testrail', minWidth: 120, width: 120, enableColumnResizing: true},
            { field: 'notes', name: 'notes', minWidth: 150, width: 150, enableColumnResizing: true},
            { field: 'pr.addToReleaseNotes', name: 'added_release', minWidth: 120, width: 120, enableColumnResizing: true}
        ]
    };

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        $scope.gridApi = gridApi;
    };
    $scope.filterTerm;

    //Call data service to get the last updated data in database dump
    dataService.getPR().then(function(response) {
        $scope.capturedData = response.data;
        $scope.gridOptions.data = response.data;
    })

    $scope.handleMilestoneChanged = function(value) {
      $scope.gridApi.grid.columns[1].filters[0].term = value;
    };

    $scope.handleStatusChanged = function(value) {
        console.log(value);
        $scope.gridApi.grid.columns[3].filters[0].term = value;
    };

    $scope.handleTeamChanged = function(value) {
      $scope.gridApi.grid.columns[4].filters[0].term = value;
    };

    $scope.handleGlobalChanged = function() {
      $scope.gridOptions.data = $filter('filter')($scope.capturedData, $scope.globalText);
    };

    $scope.resetFilters = function(){
        $scope.milestoneText = '';
        $scope.statusText = '';
        $scope.teamText = '';
        $scope.gridOptions.data = $filter('filter')($scope.capturedData, '');
    }

  });
