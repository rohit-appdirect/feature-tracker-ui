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

    var jiraTicketLinkCellTemplate = '<div>' +
                       '  <a target="_blank" href="{{row.entity.jiraTicket.jiraUrl}}">{{row.entity.jiraTicket.jiraId}}</a>' +
                       '</div>'
    var prLinkCellTemplate = '<div>' +
                       '  <a target="_blank" href="{{row.entity.pr.prUrl}}">{{row.entity.pr.prNumber}}</a>' +
                       '</div>'

    var labelCellTemplate = '<div ng-repeat="label in row.entity.pr.prLabels">' +
                       '<span>{{label}}</span>' +
                       '</div>'
    //Column defination for grid
    $scope.gridOptions = {
        enableColumnResizing: true,
        enableFiltering: true,
        columnDefs: [
            { field: 'pr.releaseBranchMergedTo', name: 'no', minWidth: 50, width: 50, enableColumnResizing: true},
            { field: 'jiraTicket.jiraId', name: 'jira_ticket', minWidth: 110, width: 110, enableColumnResizing: true, cellTemplate: jiraTicketLinkCellTemplate},
            { field: 'jiraTicket.jiraSummary', name: 'feature', minWidth: 250, width: 250, enableColumnResizing: true},
            { field: 'pr.prNumber', name: 'pr_number', minWidth: 90, width: 90, enableColumnResizing: true, cellTemplate: prLinkCellTemplate },
            { field: 'pr.prLabels', name:'labels', minWidth: 150, width: 150, enableColumnResizing: true, cellTemplate: labelCellTemplate},
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
      $scope.gridApi.grid.columns[0].filters[0].term = value;
    };

    $scope.handleLabelChanged = function(value) {
        console.log(value);
        $scope.gridApi.grid.columns[4].filters[0].term = value;
    };

    $scope.handleTeamChanged = function(value) {
      $scope.gridApi.grid.columns[5].filters[0].term = value;
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
