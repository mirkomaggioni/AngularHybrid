import * as angular from 'angular';

export const uiModule = angular.module('uiModule', [])
  .directive('uiSelect',
    function () {
      return {
        restrict: 'E',
        scope: {
          id: '@',
          name: '@',
          options: '=',
          selectedOption: '=',
          isRequired: '@'
        },
        templateUrl: 'app/main/shared/ui-select.html'
      };
    });
