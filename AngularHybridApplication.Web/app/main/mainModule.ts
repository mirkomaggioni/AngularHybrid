﻿import * as angular from 'angular';
import MainController from './mainController';

export const mainModule = angular.module('mainModule', ['ui.router'])
  .config(['$stateProvider', function ($stateProvider) {
    var mainState = {
      name: 'home',
      url: '/home',
      views: {
        'header': { templateUrl: 'app/main/header.html' },
        'main': { templateUrl: 'app/main/main.html', controller: 'mainCtrl' }
      }
    };

    $stateProvider.state(mainState);
  }])
  .controller('mainCtrl', MainController);
